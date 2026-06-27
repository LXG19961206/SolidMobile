import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { IconDocPage } from '../../../docs/pages/components/Icon/IconDocPage';

const meta: Meta = {
  title: '基础组件/Icon 图标',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <IconDocPage />,
};
