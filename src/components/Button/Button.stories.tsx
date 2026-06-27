import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { ButtonDocPage } from '../../../docs/pages/components/Button/ButtonDocPage';

const meta: Meta = {
  title: '基础组件/Button 按钮',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <ButtonDocPage />,
};
