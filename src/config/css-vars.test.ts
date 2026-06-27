import { describe, it, expect } from 'vitest';
import { generateCSSVars } from './css-vars';
import { defaultConfig } from './defaults';
import type { SolidComponentConfig } from './types';

describe('generateCSSVars', () => {
  it('includes light color variables in :root', () => {
    const css = generateCSSVars(defaultConfig);
    expect(css).toContain(':root {');
    expect(css).toContain('--sc-color-primary:');
    expect(css).toContain('--sc-color-background:');
    expect(css).toContain('color-scheme: light dark;');
  });

  it('includes typography variables in :root', () => {
    const css = generateCSSVars(defaultConfig);
    expect(css).toContain('--sc-font-family-base:');
    expect(css).toContain('--sc-font-size-md:');
    expect(css).toContain('--sc-line-height-normal:');
    expect(css).toContain('--sc-font-weight-bold:');
  });

  it('includes border-radius variables in :root', () => {
    const css = generateCSSVars(defaultConfig);
    expect(css).toContain('--sc-border-radius-sm:');
    expect(css).toContain('--sc-border-radius-md:');
    expect(css).toContain('--sc-border-radius-full:');
  });

  it('uses .dark class for "class" strategy', () => {
    const config = { ...defaultConfig, darkMode: 'class' as const };
    const css = generateCSSVars(config);
    expect(css).toContain('.dark {');
    expect(css).not.toContain('@media (prefers-color-scheme: dark)');
  });

  it('uses @media query for "media" strategy', () => {
    const config = { ...defaultConfig, darkMode: 'media' as const };
    const css = generateCSSVars(config);
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).not.toContain('.dark {');
  });

  it('dark block contains color overrides', () => {
    const config = { ...defaultConfig, darkMode: 'class' as const };
    const css = generateCSSVars(config);
    // Dark colors should differ from light
    expect(css).toContain('--sc-color-primary: #5195ff');
  });

  it('honors custom prefix', () => {
    const config = { ...defaultConfig, prefix: 'myapp' };
    const css = generateCSSVars(config);
    expect(css).toContain('--myapp-color-primary:');
    expect(css).not.toContain('--sc-color-primary:');
  });

  it('converts camelCase keys to kebab-case', () => {
    const config = { ...defaultConfig, prefix: 'sc' };
    const css = generateCSSVars(config);
    expect(css).toContain('--sc-color-primary-hover:');
    expect(css).toContain('--sc-color-background-secondary:');
    expect(css).toContain('--sc-color-text-inverse:');
  });

  it('generates valid CSS syntax', () => {
    const css = generateCSSVars(defaultConfig);
    // Should start with :root
    expect(css.trim()).toMatch(/^:root/);
    // Should end with a closing brace
    expect(css.trim()).toMatch(/}$/);
    // No duplicate properties on the same line
    const lines = css.split('\n');
    for (const line of lines) {
      const matches = line.match(/--[\w-]+:/g);
      if (matches && matches.length > 1) {
        throw new Error(`Duplicate property on line: ${line}`);
      }
    }
  });
});
