import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { CellDocPage } from '../../../docs-dev/pages/components/Cell/CellDocPage';

const meta: Meta = {
  title: '导航组件/Cell 单元格',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => <CellDocPage />,
};
