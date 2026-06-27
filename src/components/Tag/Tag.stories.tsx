import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { TagDocPage } from '../../../docs/pages/components/Tag/TagDocPage';

const meta: Meta = {
  title: '展示组件/Tag 标签',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <TagDocPage />,
};
