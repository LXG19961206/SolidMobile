import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { BadgeDocPage } from '../../../docs-dev/pages/components/Badge/BadgeDocPage';

const meta: Meta = {
  title: '展示组件/Badge 徽标',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <BadgeDocPage />,
};
