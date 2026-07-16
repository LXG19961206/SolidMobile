import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { BackTopDocPage } from '../../../docs-dev/pages/components/BackTop/BackTopDocPage';

const meta: Meta = {
  title: '展示组件/BackTop 回到顶部',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <BackTopDocPage />,
};
