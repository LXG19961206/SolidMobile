import { useT } from '../../doc-i18n'; import type { TableSection } from '../../doc-utils';
export function useUploadTableData() {
  const t = useT();
  const p: TableSection[] = [{ rows: [
    { name: 'type', type: "'image' | 'file'", def: "'image'", desc: 'upload.props.type' },
    { name: 'accept', type: 'string', def: "'image/*'", desc: 'upload.props.accept' },
    { name: 'multiple', type: 'boolean', def: 'false', desc: 'upload.props.multiple' },
    { name: 'maxCount', type: 'number', def: '—', desc: 'upload.props.maxCount' },
    { name: 'capture', type: "'environment' | 'user'", def: '—', desc: 'upload.props.capture' },
    { name: 'maxSize', type: 'number', def: '—', desc: 'upload.props.maxSize' },
    { name: 'beforeUpload', type: '(f, files) => boolean|Promise<boolean>', def: '—', desc: 'upload.props.beforeUpload' },
    { name: 'api', type: '(f, onProgress?) => Promise<string|undefined>', def: '—', desc: 'upload.props.api' },
    { name: 'fileList', type: 'UploadFile[]', def: '—', desc: 'upload.props.fileList' },
    { name: 'defaultFileList', type: 'UploadFile[]', def: '—', desc: 'upload.props.defaultFileList' },
    { name: 'onChange', type: '(fileList, file) => void', def: '—', desc: 'upload.props.onChange' },
    { name: 'onSuccess', type: '(file, response) => void', def: '—', desc: 'upload.props.onSuccess' },
    { name: 'onError', type: '(file, error) => void', def: '—', desc: 'upload.props.onError' },
    { name: 'onDelete', type: '(f) => boolean|Promise<boolean>', def: '—', desc: 'upload.props.onDelete' },
    { name: 'disabled', type: 'boolean', def: 'false', desc: 'upload.props.disabled' },
    { name: 'iconMap', type: 'Record<string, string|JSX>', def: '—', desc: 'upload.props.iconMap' },
    { name: 'children', type: 'JSX.Element', def: '—', desc: 'upload.props.children' },
    { name: 'renderFile', type: '(f, i) => JSX.Element', def: '—', desc: 'upload.props.renderFile' },
    { name: 'class', type: 'string', def: '—', desc: 'upload.props.class' },
    { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'upload.props.style' },
  ]}];
  const c: TableSection[] = [{ title: 'Upload', rows: [
    { name: '--sc-upload-gap', type: 'length', def: '8px', desc: 'upload.cssVars.--sc-upload-gap' },
    { name: '--sc-upload-thumb-size', type: 'length', def: '80px', desc: 'upload.cssVars.--sc-upload-thumb-size' },
    { name: '--sc-upload-radius', type: 'length', def: '8px', desc: 'upload.cssVars.--sc-upload-radius' },
    { name: '--sc-upload-add-bg', type: 'color', def: '#f7f8fa', desc: 'upload.cssVars.--sc-upload-add-bg' },
    { name: '--sc-upload-add-border', type: 'color', def: '#dcdee0', desc: 'upload.cssVars.--sc-upload-add-border' },
    { name: '--sc-upload-add-color', type: 'color', def: '#969799', desc: 'upload.cssVars.--sc-upload-add-color' },
    { name: '--sc-upload-progress-bg', type: 'color', def: 'rgba(0,0,0,.5)', desc: 'upload.cssVars.--sc-upload-progress-bg' },
    { name: '--sc-upload-progress-color', type: 'color', def: '#fff', desc: 'upload.cssVars.--sc-upload-progress-color' },
  ]}];
  return { propsTables: p, cssVarsTables: c };
}
