import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { DividerDocPage } from '../../../docs/pages/components/Divider/DividerDocPage';

const meta: Meta = {
  title: '基础组件/Divider 分割线',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <DividerDocPage />,
};
