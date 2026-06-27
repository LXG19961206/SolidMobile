import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { SwitchDocPage } from '../../../docs/pages/components/Switch/SwitchDocPage';

const meta: Meta = {
  title: '表单组件/Switch 开关',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <SwitchDocPage />,
};
