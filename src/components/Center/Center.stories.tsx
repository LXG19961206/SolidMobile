import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { CenterDocPage } from '../../../docs/pages/components/Center/CenterDocPage';

const meta: Meta = {
  title: '基础组件/Center 居中',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <CenterDocPage />,
};
