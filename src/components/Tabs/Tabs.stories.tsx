import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { TabsDocPage } from '../../../docs-dev/pages/components/Tabs/TabsDocPage';

const meta: Meta = {
  title: '导航组件/Tabs 标签页',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <TabsDocPage />,
};
