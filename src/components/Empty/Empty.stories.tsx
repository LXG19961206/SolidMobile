import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { EmptyDocPage } from '../../../docs/pages/components/Empty/EmptyDocPage';

const meta: Meta = {
  title: '展示组件/Empty 空状态',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <EmptyDocPage />,
};
