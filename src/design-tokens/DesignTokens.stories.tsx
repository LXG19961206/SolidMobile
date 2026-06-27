import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AllTokens, Colors, Typography, Radius } from './DesignTokenShowcase';

const meta: Meta = {
  title: '视觉规范/概览',
  component: AllTokens,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const All: Story = { render: () => <AllTokens /> };
export const ColorPalette: Story = {
  name: 'Colors',
  render: () => (
    <div style={{ padding: '1.5rem', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 1.5rem' }}>
        Color Palette
      </h1>
      <Colors />
    </div>
  ),
};
export const TypographyScale: Story = {
  name: 'Typography',
  render: () => (
    <div style={{ padding: '1.5rem', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 1.5rem' }}>
        Typography
      </h1>
      <Typography />
    </div>
  ),
};
export const BorderRadius: Story = {
  name: 'Border Radius',
  render: () => (
    <div style={{ padding: '1.5rem', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 1.5rem' }}>
        Border Radius
      </h1>
      <Radius />
    </div>
  ),
};
