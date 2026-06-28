import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Form } from './Form';
import { FormItem } from './FormItem';
import { Input } from '../Input';

describe('Form + FormItem + Input', () => {
  it('renders form with label and input', () => {
    render(() => (
      <Form>
        <FormItem name="username" label="用户名">
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    ));
    expect(screen.getByText('用户名')).toBeDefined();
    expect(screen.getByPlaceholderText('请输入')).toBeDefined();
  });

  // happy-dom 不支持原生 form submit 事件，提交流程在浏览器中验证
  it.skip('non-controlled form collects values on submit', async () => {
    const onSubmit = vi.fn();
    render(() => (
      <Form onSubmit={onSubmit}>
        <FormItem name="email" label="邮箱">
          <Input placeholder="请输入" />
        </FormItem>
        <button type="submit">提交</button>
      </Form>
    ));
    const input = screen.getByPlaceholderText('请输入') as HTMLInputElement;
    input.value = 'test@test.com';
    fireEvent.input(input);
    fireEvent.click(screen.getByText('提交'));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@test.com' });
  });

  it('controlled form syncs with external value', () => {
    const [val, setVal] = createSignal({ name: '' });
    render(() => (
      <Form value={val()} onChange={setVal}>
        <FormItem name="name" label="姓名">
          <Input />
        </FormItem>
      </Form>
    ));
    expect(screen.getByText('姓名')).toBeDefined();
  });

  it('shows validation error on FormItem', async () => {
    render(() => (
      <Form validateOnChange>
        <FormItem
          name="email"
          label="邮箱"
          rules={[{
            validator: (v: any) => !!v && (v as string).includes('@'),
            message: '请输入正确的邮箱',
          }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    ));

    const input = screen.getByPlaceholderText('请输入') as HTMLInputElement;
    input.value = 'bad';
    fireEvent.input(input);

    // Wait a tick for async validation
    await new Promise(r => setTimeout(r, 50));
    expect(screen.getByText('请输入正确的邮箱')).toBeDefined();
  });

  it('Input works standalone without Form', () => {
    const onChange = vi.fn();
    render(() => <Input value="hello" onChange={onChange} />);
    const input = screen.getByDisplayValue('hello') as HTMLInputElement;
    expect(input).toBeDefined();
  });
});
