import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { TooltipDocPage } from '../../../docs-dev/pages/components/Tooltip/TooltipDocPage';

const meta: Meta = {
  title: '展示组件/Tooltip 气泡提示',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <TooltipDocPage />,
};
