import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LayoutDocPage } from '../../../docs-dev/pages/components/Layout/LayoutDocPage';

const meta: Meta = {
  title: '基础组件/Layout 布局',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <LayoutDocPage />,
};
