import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ListDocPage } from '../../../docs/pages/components/List/ListDocPage';

const meta: Meta = {
  title: '展示组件/List 列表',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ListDocPage />,
};
