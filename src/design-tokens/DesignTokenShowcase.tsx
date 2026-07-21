import { For, type Component } from 'solid-js';
import { useConfig } from '../config';
import { useT } from '../i18n';
import { Card } from '../components/Card';
import type { ColorTokens } from '../config/types';
import rawStyles from './DesignTokenShowcase.module.css';
import { scopedStyle } from '../utils';
const styles = scopedStyle(rawStyles, 'sc-dt-design-token-showcase');

/* -------------------------------------------------------------------------- */
/*  Color Section                                                             */
/* -------------------------------------------------------------------------- */

interface SwatchDef {
  key: keyof ColorTokens;
  labelKey: string;
}

function ColorGroups() {
  const config = useConfig();
  const t = useT();
  const tk = () => config.colors.light;
  const dt = () => config.colors.dark;

  const stateSwatches = (): SwatchDef[] => [
    { key: 'primary', labelKey: 'designTokens.colors.stateBase' },
    { key: 'primaryHover', labelKey: 'designTokens.colors.stateHover' },
    { key: 'primaryActive', labelKey: 'designTokens.colors.stateActive' },
    { key: 'primaryDisabled', labelKey: 'designTokens.colors.stateDisabled' },
    { key: 'primaryPale', labelKey: 'designTokens.colors.statePale' },
  ];

  const semanticGroups = (): { nameKey: string; keys: (keyof ColorTokens)[] }[] => [
    { nameKey: 'designTokens.colors.primary', keys: ['primary', 'primaryHover', 'primaryActive', 'primaryDisabled', 'primaryPale'] },
    { nameKey: 'designTokens.colors.secondary', keys: ['secondary', 'secondaryHover', 'secondaryActive', 'secondaryDisabled', 'secondaryPale'] },
    { nameKey: 'designTokens.colors.danger', keys: ['danger', 'dangerHover', 'dangerActive', 'dangerDisabled', 'dangerPale'] },
    { nameKey: 'designTokens.colors.success', keys: ['success', 'successHover', 'successDisabled', 'successPale'] },
    { nameKey: 'designTokens.colors.warning', keys: ['warning', 'warningHover', 'warningDisabled', 'warningPale'] },
  ];

  const surfaceSwatches = (mode: 'light' | 'dark') => {
    const tokens = mode === 'light' ? tk() : dt();
    return [
      { labelKey: 'designTokens.colors.background', color: tokens.background },
      { labelKey: 'designTokens.colors.backgroundSecondary', color: tokens.backgroundSecondary },
      { labelKey: 'designTokens.colors.textPrimary', color: tokens.text },
      { labelKey: 'designTokens.colors.textSecondary', color: tokens.textSecondary },
      { labelKey: 'designTokens.colors.textTertiary', color: tokens.textTertiary },
      { labelKey: 'designTokens.colors.textInverse', color: tokens.textInverse },
      { labelKey: 'designTokens.colors.border', color: tokens.border },
      { labelKey: 'designTokens.colors.borderHover', color: tokens.borderHover },
      { labelKey: 'designTokens.colors.focus', color: tokens.focus },
    ];
  };

  const renderSwatch = (color: string, label: string, isOutline?: boolean) => (
    <div class={styles.swatchItem}>
      <div
        class={styles.swatchBox}
        classList={{ [styles.swatchOutline!]: isOutline }}
        style={{ 'background-color': color }}
      />
      <span class={styles.swatchLabel}>{label}</span>
      <code class={styles.swatchHex}>{color}</code>
    </div>
  );

  /* -------- Light -------- */
  const renderGroups = (mode: 'light' | 'dark') => {
    const tokens = mode === 'light' ? tk() : dt();
    const get = (key: keyof ColorTokens) => tokens[key];
    const isLight = mode === 'light';

    return (
      <>
        <h2 class={styles.h2}>
          {isLight ? t('designTokens.colors.lightMode') : t('designTokens.colors.darkMode')}
        </h2>

        <For each={semanticGroups()}>
          {(g) => {
            const stateLabelKeys = [
              'designTokens.colors.stateBase',
              'designTokens.colors.stateHover',
              'designTokens.colors.stateActive',
              'designTokens.colors.stateDisabled',
              'designTokens.colors.statePale',
            ];
            return (
              <div class={styles.group}>
                <h3 class={styles.groupTitle}>{t(g.nameKey)}</h3>
                <div class={styles.swatches}>
                  <For each={g.keys}>
                    {(k, i) => {
                      const val = (tokens as unknown as Record<string, string>)[k];
                      if (!val) return null;
                      return renderSwatch(val, t(stateLabelKeys[i()]));
                    }}
                  </For>
                </div>
              </div>
            );
          }}
        </For>

        <div class={styles.group}>
          <h3 class={styles.groupTitle}>
            {isLight ? t('designTokens.colors.surfaces') : t('designTokens.colors.surfacesDark')}
          </h3>
          <div class={styles.swatches}>
            <For each={surfaceSwatches(mode)}>
              {(sw) =>
                renderSwatch(
                  sw.color,
                  t(sw.labelKey),
                  sw.labelKey.includes('background') || sw.color === '#ffffff',
                )
              }
            </For>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card title={t('designTokens.colors.title')}>
      {renderGroups('light')}
      {renderGroups('dark')}
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typography Section                                                        */
/* -------------------------------------------------------------------------- */

function TypographyScale() {
  const config = useConfig();
  const t = useT();
  const tp = () => config.typography;

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
  const weights = ['normal', 'medium', 'semibold', 'bold'] as const;
  const lineHeights = ['tight', 'normal', 'relaxed'] as const;

  const weightLabelKeys: Record<string, string> = {
    normal: 'designTokens.typography.weightNormal',
    medium: 'designTokens.typography.weightMedium',
    semibold: 'designTokens.typography.weightSemibold',
    bold: 'designTokens.typography.weightBold',
  };
  const lineLabelKeys: Record<string, string> = {
    tight: 'designTokens.typography.lineTight',
    normal: 'designTokens.typography.lineNormal',
    relaxed: 'designTokens.typography.lineRelaxed',
  };

  return (
    <Card title={t('designTokens.typography.title')}>
      <h2 class={styles.h2}>{t('designTokens.typography.fontFamily')}</h2>
      <div class={styles.group}>
        <div class={styles.typoRow}>
          <span class={styles.typoLabel}>{t('designTokens.typography.fontFamilyBase')}</span>
          <span style={{ 'font-family': tp().fontFamily.base }} class={styles.typoSample}>
            The quick brown fox jumps over the lazy dog. 敏捷的棕色狐狸跳过了懒狗。
          </span>
        </div>
        <div class={styles.typoRow}>
          <span class={styles.typoLabel}>{t('designTokens.typography.fontFamilyMono')}</span>
          <span style={{ 'font-family': tp().fontFamily.mono }} class={styles.typoSample}>
            console.log(&quot;Hello, world!&quot;);
          </span>
        </div>
      </div>

      <h2 class={styles.h2}>{t('designTokens.typography.fontSize')}</h2>
      <div class={styles.group}>
        <For each={sizes}>
          {(size) => (
            <div class={styles.typoRow}>
              <span class={styles.typoLabel}>{size}</span>
              <span style={{ 'font-size': tp().fontSize[size] }} class={styles.typoSample}>
                {size === 'xxl' ? 'Heading' : size === 'xl' ? 'Subheading' : 'The quick brown fox'}
              </span>
              <code class={styles.typoValue}>{tp().fontSize[size]}</code>
            </div>
          )}
        </For>
      </div>

      <h2 class={styles.h2}>{t('designTokens.typography.fontWeight')}</h2>
      <div class={styles.group}>
        <For each={weights}>
          {(w) => (
            <div class={styles.typoRow}>
              <span class={styles.typoLabel}>{t(weightLabelKeys[w])}</span>
              <span style={{ 'font-weight': tp().fontWeight[w] }} class={styles.typoSample}>
                The quick brown fox ({tp().fontWeight[w]})
              </span>
            </div>
          )}
        </For>
      </div>

      <h2 class={styles.h2}>{t('designTokens.typography.lineHeight')}</h2>
      <div class={styles.group}>
        <For each={lineHeights}>
          {(lh) => (
            <div class={styles.typoRow}>
              <span class={styles.typoLabel}>{t(lineLabelKeys[lh])}</span>
              <span style={{ 'line-height': tp().lineHeight[lh] }} class={styles.typoSample}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </span>
              <code class={styles.typoValue}>{tp().lineHeight[lh]}</code>
            </div>
          )}
        </For>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Border Radius Section                                                     */
/* -------------------------------------------------------------------------- */

function RadiusScale() {
  const config = useConfig();
  const t = useT();
  const r = () => config.borderRadius;
  const sizes = ['sm', 'md', 'lg', 'full'] as const;

  return (
    <Card title={t('designTokens.radius.title')}>
      <div class={styles.group}>
        <For each={sizes}>
          {(size) => (
            <div class={styles.typoRow}>
              <span class={styles.typoLabel}>{size}</span>
              <div class={styles.radiusBox} style={{ 'border-radius': r()[size] }} />
              <code class={styles.typoValue}>{r()[size]}</code>
            </div>
          )}
        </For>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Exports                                                                   */
/* -------------------------------------------------------------------------- */

export const Colors: Component = () => <ColorGroups />;
export const Typography: Component = () => <TypographyScale />;
export const Radius: Component = () => <RadiusScale />;

/**
 * Full design token showcase — all sections in one view.
 */
export const AllTokens: Component = () => {
  const t = useT();

  return (
    <div class={styles.root} style={{ display: 'flex', 'flex-direction': 'column', gap: '16px' }}>
      <h1 class={styles.h1}>{t('designTokens.title')}</h1>
      <p class={styles.intro}>{t('designTokens.intro')}</p>
      <ColorGroups />
      <TypographyScale />
      <RadiusScale />
    </div>
  );
};
