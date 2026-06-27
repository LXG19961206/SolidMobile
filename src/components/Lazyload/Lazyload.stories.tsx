import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { LazyloadDocPage } from '../../../docs/pages/components/Lazyload/LazyloadDocPage';

const meta: Meta = {
  title: '展示组件/Lazyload 懒加载',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <LazyloadDocPage />,
};
