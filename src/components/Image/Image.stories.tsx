import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ImageDocPage } from '../../../docs/pages/components/Image/ImageDocPage';

const meta: Meta = {
  title: '展示组件/Image 图片',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ImageDocPage />,
};
