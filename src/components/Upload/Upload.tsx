import {
  createSignal, mergeProps, splitProps, For, Show,
  type Component, type JSX,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../../utils';
import { useT } from '../../i18n';
import { Image } from '../Image';
import { Icon } from '../Icon';
import type { UploadProps, UploadFile } from './types';
import styles from './Upload.module.css';

/* ── Defaults ── */

const defaultProps: Partial<UploadProps> = {
  type: 'image',
  multiple: false,
  maxCount: 999,
};

/* ── Helpers ── */

let uidCounter = 0;
function genUid(): string {
  return `upload_${Date.now().toString(36)}_${(++uidCounter).toString(36)}`;
}

function isImage(mime: string): boolean {
  return mime.startsWith('image/');
}

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/** Guess MIME category: 'image' | 'video' | 'audio' | null */
function mimeCategory(mime: string): string | null {
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  return null;
}

/** Extract file extension (lowercase, no dot) */
function fileExt(name: string): string {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(i + 1).toLowerCase() : '';
}

/* ══════════════════════════════════════════════════════════════════
   Upload
   ══════════════════════════════════════════════════════════════════ */

export const Upload: Component<UploadProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'type', 'accept', 'multiple', 'maxCount', 'capture',
    'api', 'maxSize', 'beforeUpload',
    'fileList', 'defaultFileList',
    'children', 'renderFile',
    'iconMap',
    'onChange', 'onSuccess', 'onError', 'onDelete',
    'disabled',
    'class', 'style',
  ]);

  const t = useT();

  /* ── Preview state ── */

  const [previewFile, setPreviewFile] = createSignal<UploadFile | null>(null);

  /* ── File list state (uncontrolled) ── */

  const isControlled = () => local.fileList !== undefined;
  const [innerList, setInnerList] = createSignal<UploadFile[]>(local.defaultFileList ?? []);

  /** Current file list (controlled or uncontrolled) */
  const files = () => (isControlled() ? local.fileList! : innerList());

  /* ── Hidden input ref ── */

  let inputEl!: HTMLInputElement;

  function openPicker() {
    if (local.disabled) return;
    inputEl.value = '';
    inputEl.click();
  }

  /* ── Create UploadFile from raw File ── */

  function toUploadFile(file: File): UploadFile {
    const uid = genUid();
    return {
      uid,
      name: file.name,
      size: file.size,
      type: file.type,
      status: local.api ? 'pending' : 'done',
      thumbUrl: isImage(file.type) ? URL.createObjectURL(file) : undefined,
      originFile: file,
    };
  }

  /* ── Patch a file in the list ── */

  function patchFile(uid: string, patch: Partial<UploadFile>) {
    const list = files();
    const file = list.find(f => f.uid === uid);
    if (!file) return;

    const updated = list.map(f => (f.uid === uid ? { ...f, ...patch } : f));

    if (isControlled()) {
      local.onChange?.(updated, updated.find(f => f.uid === uid)!);
    } else {
      setInnerList(updated);
      local.onChange?.(updated, updated.find(f => f.uid === uid)!);
    }
  }

  /* ── Upload a single file ── */

  async function uploadOne(file: UploadFile) {
    if (!local.api || !file.originFile) return;

    patchFile(file.uid, { status: 'uploading', percent: 0 });

    try {
      const url = await local.api(file.originFile, (pct: number) => {
        patchFile(file.uid, { percent: Math.min(pct, 99) });
      });

      patchFile(file.uid, { status: 'done', percent: 100, url });
      local.onSuccess?.(file, url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      patchFile(file.uid, { status: 'error', error: msg });
      local.onError?.(file, msg);
    }
  }

  /* ── Handle file input change ── */

  async function onInputChange(e: Event) {
    const rawFiles = Array.from((e.target as HTMLInputElement).files ?? []);
    if (rawFiles.length === 0) return;

    // Respect maxCount
    const slot = local.maxCount! - files().length;
    if (slot <= 0) return;
    const batch = rawFiles.slice(0, slot);

    // Validate
    const valid: File[] = [];
    for (const f of batch) {
      if (local.maxSize && f.size > local.maxSize) continue;
      if (local.beforeUpload) {
        try {
          const ok = await local.beforeUpload(f, batch);
          if (ok === false) continue;
        } catch {
          continue;
        }
      }
      valid.push(f);
    }

    if (valid.length === 0) return;

    // Convert to UploadFile and append
    const newFiles = valid.map(toUploadFile);
    const updated = [...files(), ...newFiles];
    const lastNew = newFiles[newFiles.length - 1];

    if (isControlled()) {
      local.onChange?.(updated, lastNew);
    } else {
      setInnerList(updated);
      local.onChange?.(updated, lastNew);
    }

    // Start uploads concurrently
    if (local.api) {
      await Promise.all(newFiles.map(f => uploadOne(f)));
    }
  }

  /* ── Delete ── */

  async function removeFile(file: UploadFile) {
    if (local.onDelete) {
      try {
        const ok = await local.onDelete(file);
        if (ok === false) return;
      } catch {
        return;
      }
    }

    // Revoke blob URL to free memory
    if (file.thumbUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(file.thumbUrl);
    }

    const updated = files().filter(f => f.uid !== file.uid);

    if (isControlled()) {
      local.onChange?.(updated, file);
    } else {
      setInnerList(updated);
      local.onChange?.(updated, file);
    }
  }

  /* ── Derived ── */

  const acceptAttr = () => local.accept ?? (local.type === 'image' ? 'image/*' : undefined);
  const canAdd = () => !local.disabled && files().length < local.maxCount!;

  /* ── Status text ── */

  function statusText(st: UploadFile['status']): string {
    switch (st) {
      case 'pending': return t('component.upload.pending');
      case 'uploading': return t('component.upload.uploading');
      case 'done': return t('component.upload.done');
      case 'error': return t('component.upload.error');
    }
  }

  /* ── Resolve icon from iconMap ── */

  function resolveIcon(file: UploadFile): JSX.Element {
    const map = local.iconMap;
    if (!map) return <>&#x1F4C4;</>; // default 📄

    const ext = fileExt(file.name);
    const cat = mimeCategory(file.type);
    const key = map[ext] ?? (cat ? map[cat] : undefined) ?? map['*'];
    if (key == null) return <>&#x1F4C4;</>;

    if (typeof key === 'string') {
      return <Icon name={key} size={18} />;
    }
    return key;
  }

  /* ── Render ── */

  return (
    <div class={cn(styles.wrapper, local.class)} style={local.style as JSX.CSSProperties | undefined}>
      {/* Hidden file input */}
      <input
        ref={inputEl!}
        type="file"
        accept={acceptAttr()}
        multiple={local.multiple}
        capture={local.capture}
        onChange={onInputChange}
        style="display:none"
      />

      {/* ======================== Image type ======================== */}
      <Show when={local.type === 'image'} fallback={
        /* ====================== File type ====================== */
        <div class={styles.fileList}>
          <For each={files()}>
            {(file, i) => (
              <Show when={local.renderFile} fallback={
                <div class={styles.fileItem}>
                  <span class={styles.fileIcon}>{resolveIcon(file)}</span>
                  <span class={styles.fileName} title={file.name}>{file.name}</span>
                  <span class={styles.fileSize}>{fmtSize(file.size)}</span>
                  <span
                    class={cn(styles.fileStatus, {
                      [styles.statusDone!]: file.status === 'done',
                      [styles.statusError!]: file.status === 'error',
                      [styles.statusUploading!]: file.status === 'uploading',
                    })}
                    onClick={file.status === 'error' ? () => uploadOne(file) : undefined}
                    style={file.status === 'error' ? { cursor: 'pointer', 'text-decoration': 'underline' } : undefined}
                  >
                    {file.status === 'uploading' ? `${Math.round(file.percent ?? 0)}%` : statusText(file.status)}
                  </span>
                  <button
                    class={styles.fileDelete}
                    onClick={() => removeFile(file)}
                    innerHTML="&times;"
                  />
                </div>
              }>
                {local.renderFile!(file, i())}
              </Show>
            )}
          </For>

          {/* Add button (file type) */}
          <Show when={canAdd()}>
            <Show when={local.children} fallback={
              <div class={styles.fileAddRow} onClick={openPicker}>
                <span class={styles.fileAddIcon}>+</span>
                <span class={styles.fileAddText}>{t('component.upload.addFile')}</span>
              </div>
            }>
              <div onClick={openPicker}>{local.children}</div>
            </Show>
          </Show>
        </div>
      }>
        {/* ==================== Image grid ==================== */}
        <Show when={!local.renderFile} fallback={
          /* Custom render — flex column, not constrained by grid */
          <div class={styles.customList}>
            <For each={files()}>
              {(file, i) => local.renderFile!(file, i())}
            </For>
            {/* Add button for custom render mode */}
            <Show when={canAdd()}>
              <Show when={local.children} fallback={
                <div class={styles.addBtn} onClick={openPicker} style={{ width: '100%', 'max-width': '80px' }}>
                  <span>+</span>
                  <span class={styles.addText}>{t('component.upload.upload')}</span>
                </div>
              }>
                <div onClick={openPicker} style={{ 'margin-top': '8px' }}>
                  {local.children}
                </div>
              </Show>
            </Show>
          </div>
        }>
          <div class={styles.imageGrid}>
          <For each={files()}>
            {(file, i) => (
              <div class={styles.imageItem}>
                {/* Thumbnail with preview */}
                <Show when={file.thumbUrl || file.url}>
                  <Image
                    src={file.thumbUrl ?? file.url!}
                    alt={file.name}
                    block
                    fit="cover"
                    onClick={() => setPreviewFile(file)}
                    />
                  </Show>

                  {/* Non-image fallback in image grid */}
                  <Show when={!file.thumbUrl && !file.url}>
                    <div class={styles.filePlaceholder}>{file.name}</div>
                  </Show>

                  {/* Uploading overlay */}
                  <Show when={file.status === 'uploading'}>
                    <div class={styles.overlay}><span>{Math.round(file.percent ?? 0)}%</span></div>
                  </Show>

                  {/* Error overlay — click to retry */}
                  <Show when={file.status === 'error'}>
                    <div class={styles.overlay} onClick={() => uploadOne(file)}>
                      <span style={{ cursor: 'pointer' }}>! 重试</span>
                    </div>
                  </Show>

                  {/* Delete button */}
                  <button class={styles.deleteBtn} onClick={() => removeFile(file)} innerHTML="&times;" />
                </div>
              )}
          </For>

          {/* Default add button — part of grid, same size as thumbnails */}
          <Show when={canAdd() && !local.children}>
            <div class={styles.addBtn} onClick={openPicker}>
              <span>+</span>
              <span class={styles.addText}>{t('component.upload.upload')}</span>
            </div>
          </Show>
        </div>

        {/* Custom add button — separate from grid, not constrained by grid column width */}
        <Show when={canAdd() && local.children}>
          <div onClick={openPicker} style={{ 'margin-top': '8px' }}>
            {local.children}
          </div>
        </Show>
        </Show>
      </Show>

      {/* ── Preview overlay (portaled to body to escape PhoneSimulator transform) ── */}
      <Show when={previewFile()}>
        <Portal>
          <div class={styles.previewOverlay} onClick={() => setPreviewFile(null)}>
            <img
              src={previewFile()!.thumbUrl ?? previewFile()!.url!}
              class={styles.previewImg}
              onClick={() => setPreviewFile(null)}
            />
          </div>
        </Portal>
      </Show>
    </div>
  );
};
