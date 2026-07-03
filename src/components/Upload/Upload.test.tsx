import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@solidjs/testing-library';
import { Upload } from './Upload';
import type { UploadFile } from './types';

/* ── Helpers ── */

function createFile(name: string, size = 1024, type = 'image/png'): File {
  return new File([new Uint8Array(size)], name, { type });
}

/* ── Tests ── */

describe('Upload', () => {
  it('renders add button by default (image type)', () => {
    const { container } = render(() => <Upload />);
    expect(container.textContent).toContain('上传');
  });

  it('renders add button for file type', () => {
    const { container } = render(() => <Upload type="file" />);
    expect(container.textContent).toContain('添加文件');
  });

  it('renders defaultFileList', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'a.png', size: 1024, type: 'image/png', status: 'done', url: '/a.png' },
      { uid: '2', name: 'b.png', size: 2048, type: 'image/png', status: 'done', url: '/b.png' },
    ];
    const { container } = render(() => <Upload defaultFileList={files} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(2);
    expect(imgs[0].getAttribute('alt')).toBe('a.png');
    expect(imgs[1].getAttribute('alt')).toBe('b.png');
  });

  it('fires onChange when file is selected', async () => {
    const onChange = vi.fn();
    const { container } = render(() => <Upload onChange={onChange} />);

    const input = container.querySelector('input[type="file"]')!;
    const file = createFile('test.png');
    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
    const [list, added] = onChange.mock.calls[0] as [UploadFile[], UploadFile];
    expect(list).toHaveLength(1);
    expect(added.name).toBe('test.png');
    expect(added.status).toBe('done'); // no api → status done
    expect(added.thumbUrl).toMatch(/^blob:/);
  });

  it('respects maxCount', async () => {
    const onChange = vi.fn();
    const { container } = render(() => (
      <Upload maxCount={2} defaultFileList={[
        { uid: '1', name: 'a.png', size: 100, type: 'image/png', status: 'done' },
      ]} onChange={onChange} />
    ));

    // Can add one more
    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('b.png')] } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toHaveLength(2);

    // Now full → adding another should be ignored
    fireEvent.change(input, { target: { files: [createFile('c.png')] } });
    expect(onChange).toHaveBeenCalledTimes(1); // not called again
  });

  it('filters by maxSize', async () => {
    const onChange = vi.fn();
    const { container } = render(() => <Upload maxSize={500} onChange={onChange} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('big.png', 1000)] } });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('beforeUpload can reject files', async () => {
    const onChange = vi.fn();
    const beforeUpload = vi.fn().mockResolvedValue(false);
    const { container } = render(() => <Upload beforeUpload={beforeUpload} onChange={onChange} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('x.png')] } });

    expect(beforeUpload).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders controlled fileList', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'x.png', size: 100, type: 'image/png', status: 'done' },
    ];
    const { container } = render(() => <Upload fileList={files} />);
    expect(container.textContent).toContain('x.png');
  });

  it('renders file type list view', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'report.pdf', size: 20480, type: 'application/pdf', status: 'done' },
    ];
    const { container } = render(() => <Upload type="file" defaultFileList={files} />);
    expect(container.textContent).toContain('report.pdf');
    expect(container.textContent).toContain('20.0KB');
  });

  it('fires onDelete before removal', async () => {
    const onDelete = vi.fn().mockResolvedValue(false);
    const onChange = vi.fn();
    const files: UploadFile[] = [
      { uid: '1', name: 'a.png', size: 100, type: 'image/png', status: 'done' },
    ];
    const { container } = render(() => (
      <Upload defaultFileList={files} onDelete={onDelete} onChange={onChange} />
    ));

    const delBtn = container.querySelector('button')!;
    delBtn.click();
    expect(onDelete).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls api when provided', async () => {
    const api = vi.fn().mockResolvedValue('/uploaded.png');
    const onChange = vi.fn();
    const { container } = render(() => <Upload api={api} onChange={onChange} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('test.png')] } });

    await new Promise(r => setTimeout(r, 50));

    expect(api).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(2);
    const finalList = onChange.mock.calls[onChange.mock.calls.length - 1][0] as UploadFile[];
    expect(finalList[0].status).toBe('done');
    expect(finalList[0].url).toBe('/uploaded.png');
  });

  it('renders custom children instead of default add button', () => {
    const { container } = render(() => (
      <Upload><button data-testid="custom-btn">自定义</button></Upload>
    ));
    expect(container.querySelector('[data-testid="custom-btn"]')).toBeDefined();
  });

  it('renders file items via renderFile', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'a.png', size: 100, type: 'image/png', status: 'done' },
    ];
    const { container } = render(() => (
      <Upload defaultFileList={files} renderFile={(f) => <span data-testid="custom-file">{f.name}</span>} />
    ));
    expect(container.querySelector('[data-testid="custom-file"]')?.textContent).toBe('a.png');
  });

  it('accepts image/* by default for type image', () => {
    const { container } = render(() => <Upload />);
    const input = container.querySelector('input')!;
    expect(input.getAttribute('accept')).toBe('image/*');
  });

  it('custom accept overrides default', () => {
    const { container } = render(() => <Upload accept=".pdf,.doc" />);
    const input = container.querySelector('input')!;
    expect(input.getAttribute('accept')).toBe('.pdf,.doc');
  });

  it('file type has no default accept', () => {
    const { container } = render(() => <Upload type="file" />);
    const input = container.querySelector('input')!;
    expect(input.getAttribute('accept')).toBeFalsy();
  });

  it('calls onSuccess when upload succeeds', async () => {
    const api = vi.fn().mockResolvedValue('/ok.png');
    const onSuccess = vi.fn();
    const { container } = render(() => <Upload api={api} onSuccess={onSuccess} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('ok.png')] } });
    await new Promise(r => setTimeout(r, 50));

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess.mock.calls[0][0].name).toBe('ok.png');
    expect(onSuccess.mock.calls[0][1]).toBe('/ok.png');
  });

  it('calls onError when upload fails', async () => {
    const api = vi.fn().mockRejectedValue(new Error('network error'));
    const onError = vi.fn();
    const { container } = render(() => <Upload api={api} onError={onError} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('fail.png')] } });
    await new Promise(r => setTimeout(r, 50));

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][1]).toBe('network error');
  });

  it('retries upload when error overlay is clicked', async () => {
    let attempts = 0;
    const api = vi.fn().mockImplementation(() => {
      attempts++;
      if (attempts === 1) return Promise.reject(new Error('fail'));
      return Promise.resolve('/retry.png');
    });
    const onChange = vi.fn();
    const { container } = render(() => <Upload api={api} onChange={onChange} />);

    const input = container.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [createFile('retry.png')] } });
    await new Promise(r => setTimeout(r, 50));
    expect(api).toHaveBeenCalledTimes(1);

    // Click error overlay to retry
    const errorOverlay = container.querySelector('[class*="overlay"]')!;
    errorOverlay.click();
    await new Promise(r => setTimeout(r, 50));
    expect(api).toHaveBeenCalledTimes(2);

    const finalList = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(finalList[0].status).toBe('done');
    expect(finalList[0].url).toBe('/retry.png');
  });
});
