import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { EllipsisDocPage } from '../../../docs-dev/pages/components/Ellipsis/EllipsisDocPage';

const meta: Meta = {
  title: '展示组件/Ellipsis 文字省略',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <EllipsisDocPage />,
};
