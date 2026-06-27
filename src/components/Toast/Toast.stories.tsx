import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ToastDocPage } from '../../../docs/pages/components/Toast/ToastDocPage';

const meta: Meta = {
  title: '反馈组件/Toast 轻提示',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ToastDocPage />,
};
