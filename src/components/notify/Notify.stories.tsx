import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { NotifyDocPage } from './NotifyDocPage';

const meta: Meta = {
  title: '反馈组件/Notify 通知栏',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <NotifyDocPage />,
};
