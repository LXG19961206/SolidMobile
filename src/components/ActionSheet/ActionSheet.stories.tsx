import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ActionSheetDocPage } from '../../../docs/pages/components/ActionSheet/ActionSheetDocPage';

const meta: Meta = {
  title: '反馈组件/ActionSheet 动作面板',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ActionSheetDocPage />,
};
