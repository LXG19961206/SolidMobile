import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LoadingDocPage } from '../../../docs-dev/pages/components/Loading/LoadingDocPage';

const meta: Meta = {
  title: '反馈组件/Loading 加载',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <LoadingDocPage />,
};
