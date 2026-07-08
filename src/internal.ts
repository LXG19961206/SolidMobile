/**
 * Internal barrel entry — used only for the local preserveModules build
 * (`BUILD_LOCAL=1`).  Re-exports the public API plus doc-utils and design
 * tokens so the docs site can import them from `dist-dev/` when running
 * with `USE_DIST=1`.
 *
 * NOT part of the published npm package.
 */
// @ts-nocheck — doc-utils & design-tokens are internal, types are loose
export * from './index';
export * from '../docs-dev/doc-utils';
export * from '../docs-dev/doc-utils/mobile/MobilePreview';
export { AllTokens } from './design-tokens/DesignTokenShowcase';
