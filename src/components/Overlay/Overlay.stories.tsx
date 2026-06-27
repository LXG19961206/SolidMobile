import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { OverlayDocPage } from '../../../docs/pages/components/Overlay/OverlayDocPage';

const meta: Meta = {
  title: '反馈组件/Overlay 遮罩层',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <OverlayDocPage />,
};
