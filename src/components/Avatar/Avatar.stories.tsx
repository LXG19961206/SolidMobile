import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AvatarDocPage } from '../../../docs-dev/pages/components/Avatar/AvatarDocPage';

const meta: Meta = {
  title: '展示组件/Avatar 头像',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <AvatarDocPage />,
};
