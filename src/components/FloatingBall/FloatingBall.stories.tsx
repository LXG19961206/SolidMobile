import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { FloatingBallDocPage } from '../../../docs-dev/pages/components/FloatingBall/FloatingBallDocPage';

const meta: Meta = {
  title: '展示组件/FloatingBall 悬浮球',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <FloatingBallDocPage />,
};
