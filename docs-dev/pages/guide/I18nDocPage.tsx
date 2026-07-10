import { createSignal, For, Show, useContext, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ProviderConfig } from '../../../src/config';
import { Cell, Picker } from '../../../src/components';
import { CodeBlock, DocLayout, PhoneTargetContext } from '../../doc-utils';
import { useT, useLocale } from '../../doc-i18n';
import { messages as libMessages } from '../../../src/i18n/dictionaries';

/** ── Language configs for phone demo ── */

interface LangConfig {
  key: string;
  label: string;
  locale: string;
  dict: Record<string, any>;
  pickerTitle: string;
  placeholder: string;
  columns: { text: string; value: string }[][];
}

const PHONE_LANG_CONFIGS: LangConfig[] = [
  {
    key: 'ja', label: '日本語', locale: 'ja-JP',
    dict: { 'ja-JP': { component: { picker: { cancel: 'キャンセル', confirm: '確認', select: '選択してください' }, select: { placeholder: '選択してください' } } } },
    pickerTitle: '都市選択', placeholder: '選択してください',
    columns: [[{ text: '東京', value: 'tokyo' }, { text: '大阪', value: 'osaka' }, { text: '京都', value: 'kyoto' }, { text: '札幌', value: 'sapporo' }, { text: '福岡', value: 'fukuoka' }, { text: '名古屋', value: 'nagoya' }]],
  },
  {
    key: 'ko', label: '한국어', locale: 'ko-KR',
    dict: { 'ko-KR': { component: { picker: { cancel: '취소', confirm: '확인', select: '선택하세요' }, select: { placeholder: '선택하세요' } } } },
    pickerTitle: '도시 선택', placeholder: '선택하세요',
    columns: [[{ text: '서울', value: 'seoul' }, { text: '부산', value: 'busan' }, { text: '인천', value: 'incheon' }, { text: '대구', value: 'daegu' }, { text: '대전', value: 'daejeon' }, { text: '광주', value: 'gwangju' }]],
  },
  {
    key: 'fr', label: 'Français', locale: 'fr-FR',
    dict: { 'fr-FR': { component: { picker: { cancel: 'Annuler', confirm: 'Confirmer', select: 'Sélectionner' }, select: { placeholder: 'Sélectionner' } } } },
    pickerTitle: 'Ville', placeholder: 'Sélectionner',
    columns: [[{ text: 'Paris', value: 'paris' }, { text: 'Lyon', value: 'lyon' }, { text: 'Marseille', value: 'marseille' }, { text: 'Bordeaux', value: 'bordeaux' }, { text: 'Lille', value: 'lille' }, { text: 'Toulouse', value: 'toulouse' }]],
  },
];

/** Single-language Picker demo with isolated state. */
const LangPickerCell: Component<{ config: LangConfig; teleport: HTMLElement | undefined }> = (props) => {
  const [showPicker, setShowPicker] = createSignal(false);
  const [pickerLabel, setPickerLabel] = createSignal('');

  return (
    <ProviderConfig config={{ locale: props.config.locale as any }} localeMessages={props.config.dict}>
      <Cell
        title={props.config.pickerTitle}
        value={pickerLabel() || props.config.placeholder}
        clickable
        onClick={() => setShowPicker(true)}
      />
      <Picker
        columns={props.config.columns}
        show={showPicker()}
        onUpdateShow={setShowPicker}
        title={props.config.pickerTitle}
        teleport={props.teleport}
        onChange={(items) => setPickerLabel(String(items[0]?.text ?? ''))}
        onConfirm={(items) => {
          if (items[0]) setPickerLabel(String(items[0].text ?? ''));
          setShowPicker(false);
        }}
        onCancel={() => setShowPicker(false)}
      />
    </ProviderConfig>
  );
};

/** Demo content rendered inside the right-side phone simulator via Portal. */
const PhoneI18nDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [activeLangs, setActiveLangs] = createSignal(new Set<string>(['ja']));
  const target = () => phone?.();

  const toggleLang = (key: string) => {
    setActiveLangs(new Set([key]));
  };

  return (
    <Show when={target()}>
      <Portal mount={target()!}>
        <style>{`
          .i18n-lang-radio {
            -webkit-appearance: none;
            appearance: none;
            border: 1.5px solid #c4c4c4;
            border-radius: 50%;
            cursor: pointer;
            margin: 0;
            padding: 0;
            background: #fff;
            vertical-align: middle;
            flex-shrink: 0;
          }
          .i18n-lang-radio:checked {
            border-color: var(--sc-color-primary, #1677ff);
            background: var(--sc-color-primary, #1677ff);
            box-shadow: inset 0 0 0 3px #fff;
          }
          html.dark .i18n-lang-radio {
            border-color: #6b7280;
            background: #1f2937;
          }
          html.dark .i18n-lang-radio:checked {
            border-color: var(--sc-color-primary, #1677ff);
            background: var(--sc-color-primary, #1677ff);
            box-shadow: inset 0 0 0 3px #1f2937;
          }
        `}</style>
        <div style={{ padding: '12px 0' }}>
          <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap', 'margin-bottom': '12px', 'padding': '8px 2px 0' }}>
            <For each={PHONE_LANG_CONFIGS}>
              {(lang) => (
                <label style={{ display: 'flex', 'align-items': 'center', gap: '4px', cursor: 'pointer', 'font-size': '0.8rem' }}>
                  <input
                    type="radio"
                    class="i18n-lang-radio"
                    name="phone-lang-demo"
                    checked={activeLangs().has(lang.key)}
                    onChange={() => toggleLang(lang.key)}
                    style={{ width: '14px', height: '14px' }}
                  />
                  {lang.label}
                </label>
              )}
            </For>
          </div>
          <For each={PHONE_LANG_CONFIGS}>
            {(lang) => (
              <Show when={activeLangs().has(lang.key)}>
                <div style={{ 'margin-bottom': '10px' }}>
                  <LangPickerCell config={lang} teleport={target()} />
                </div>
              </Show>
            )}
          </For>
        </div>
      </Portal>
    </Show>
  );
};

const docCodeBasicUsage = `import { createSignal, For, Show } from 'solid-js';
import { ProviderConfig, Picker, Cell } from 'solid-mobile';

// 多语言词条
const messages = {
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認', select: '選択してください' },
      dialog: { confirmText: 'OK', cancelText: 'キャンセル' },
      datePicker: { title: '日付選択', placeholder: '日付を選択' },
      calendar: { confirmText: '決定', placeholder: '日付選択' },
      list: { loading: '読み込み中...', empty: 'データなし' },
    },
  },
  'ko-KR': {
    component: {
      picker: { cancel: '취소', confirm: '확인', select: '선택하세요' },
      dialog: { confirmText: '확인', cancelText: '취소' },
      datePicker: { title: '날짜 선택', placeholder: '날짜를 선택하세요' },
      calendar: { confirmText: '확인', placeholder: '날짜 선택' },
      list: { loading: '로딩 중...', empty: '데이터 없음' },
    },
  },
  'fr-FR': {
    component: {
      picker: { cancel: 'Annuler', confirm: 'Confirmer', select: 'Sélectionner' },
      dialog: { confirmText: 'Confirmer', cancelText: 'Annuler' },
      datePicker: { title: 'Choisir une date', placeholder: 'Sélectionner une date' },
      calendar: { confirmText: 'Confirmer', placeholder: 'Sélectionner une date' },
      list: { loading: 'Chargement...', empty: 'Aucune donnée' },
    },
  },
};

// 每种语言的 Picker 数据
const langConfigs = [
  {
    key: 'ja', locale: 'ja-JP', title: '都市選択', placeholder: '選択してください',
    columns: [[{ text: '東京', value: 'tokyo' }, { text: '大阪', value: 'osaka' }, { text: '京都', value: 'kyoto' }]],
  },
  {
    key: 'ko', locale: 'ko-KR', title: '도시 선택', placeholder: '선택하세요',
    columns: [[{ text: '서울', value: 'seoul' }, { text: '부산', value: 'busan' }, { text: '인천', value: 'incheon' }]],
  },
  {
    key: 'fr', locale: 'fr-FR', title: 'Ville', placeholder: 'Sélectionner',
    columns: [[{ text: 'Paris', value: 'paris' }, { text: 'Lyon', value: 'lyon' }, { text: 'Marseille', value: 'marseille' }]],
  },
];

function App() {
  const [locale, setLocale] = createSignal('ja-JP');

  return (
    <ProviderConfig config={{ locale: locale() as any }} localeMessages={messages}>
      {/* 语言切换 Radio */}
      <div style={{ display: 'flex', gap: '12px', padding: '8px 0' }}>
        <For each={langConfigs}>
          {(lang) => (
            <label>
              <input
                type="radio" name="lang"
                checked={locale() === lang.locale}
                onChange={() => setLocale(lang.locale)}
              />
              {lang.locale}
            </label>
          )}
        </For>
      </div>

      {/* 对应语言的 Picker */}
      <For each={langConfigs}>
        {(lang) => (
          <Show when={locale() === lang.locale}>
            <LangPickerDemo
              locale={lang.locale}
              title={lang.title}
              placeholder={lang.placeholder}
              columns={lang.columns}
            />
          </Show>
        )}
      </For>
    </ProviderConfig>
  );
}

// Picker 演示组件（隔离状态）
function LangPickerDemo(props) {
  const [show, setShow] = createSignal(false);
  const [label, setLabel] = createSignal('');

  return (
    <>
      <Cell
        title={props.title}
        value={label() || props.placeholder}
        clickable
        onClick={() => setShow(true)}
      />
      <Picker
        columns={props.columns}
        show={show()}
        onUpdateShow={setShow}
        title={props.title}
        onChange={(items) => setLabel(items[0]?.text ?? '')}
        onConfirm={(items) => { if (items[0]) setLabel(items[0].text ?? ''); setShow(false); }}
        onCancel={() => setShow(false)}
      />
    </>
  );
}`;

const docCodeOverride = `import { ProviderConfig } from 'solid-mobile';

const zhOverride = {
  'zh-CN': {
    component: {
      dialog: {
        confirmText: '好的',  // 覆盖内置 "确认"
        cancelText: '算了',   // 覆盖内置 "取消"
      },
    },
  },
};

function App() {
  return (
    <ProviderConfig
      config={{ locale: 'zh-CN' }}
      localeMessages={zhOverride}
    >
      <App />
    </ProviderConfig>
  );
}`;

const docCodeDictStructure = `// 字典结构 (部分)
{
  designTokens: { title, intro, colors: {...}, typography: {...}, radius: {...} },
  config:       { cssPrefix, darkMode, locale },
  common:       { and, props, copyCode, copied, viewCode, propsTable: {...} },
  component:    {
    picker:     { cancel, confirm, select, selectDate, selectTime, props: {...} },
    datePicker: { title, panelTitle, placeholder, units: {...} },
    dialog:     { confirmText, cancelText },
    select:     { placeholder, props: {...} },
    calendar:   { weekdays, titleFormatter, startLabel, endLabel, confirmText, placeholder, ... },
    list:       { loading, finished, empty, error },
    upload:     { upload, addFile, pending, uploading, done, error, retry },
    pullRefresh:{ pulling, loosing, loading, success },
    stepper:    { decrement, increment },
    tag:        { close },
    loading:    { label },
    cityPicker: { title, placeholder },
    timePicker: { placeholder },
    cascader:   { placeholder },
    button:     { title, intro, ... },  // 文档 demo 标签
    image:      { title, intro, ... },  // 文档 demo 标签
  },
}`;

const docCodeProgrammatic = `import { setUserMessages } from 'solid-mobile';

setUserMessages({
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認' },
    },
  },
});`;

const I18nDocPage: Component = () => {
  const t = useT();
  const isEn = () => useLocale() === 'en-US';
  const SECTION_H2 = { 'font-size': '1.15rem', 'font-weight': 600, margin: '2.5rem 0 0.75rem' };

  const handleDownloadTemplate = () => {
    const componentDict = (libMessages as any)['en-US']?.component;
    const template = {
      '「替换为你的 locale，如 ja-JP」': {
        component: componentDict ?? {},
      },
    };
    const json = JSON.stringify(template, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solid-component-i18n-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DocLayout>
      <div class="guide-card" style={{ border: 'none', margin: '0' }}>
        <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>{t('i18nPage.title')}</h1>
        <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
          {t('i18nIntro')}
        </p>

        <h2 style={SECTION_H2}>{t('i18nPage.downloadTemplate')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          {isEn()
            ? <>Click the button below to download the component runtime dictionary template (JSON). <strong>Contains only strings actually used by components</strong> (Picker, Dialog, Calendar — button labels, placeholders, status hints), excluding documentation-site internal strings.</>
            : <>点击下方按钮下载组件运行时词条模板（JSON）。<strong>仅包含组件实际使用的文案</strong>（Picker、Dialog、Calendar 等的按钮、占位符、状态提示），不含文档站内部词条。</>
          }
        </p>
        <div style={{
          background: 'var(--sc-doc-card-placeholder, #f3f4f6)',
          'border-radius': '10px', padding: '16px 20px', 'margin-bottom': '0.75rem',
        }}>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
            <strong>{isEn() ? 'Steps:' : '使用步骤：'}</strong><br />
            {isEn()
              ? <>1. Download template → 2. Replace English values with your target language → 3. Pass via <code>localeMessages</code></>
              : <>1. 下载模板 → 2. 将英文 value 替换为目标语言 → 3. 通过 <code>localeMessages</code> 传入</>
            }
          </div>
          <div style={{ 'font-size': '0.8rem', color: '#9ca3af', 'line-height': 1.6, 'margin-bottom': '12px' }}>
            {isEn()
              ? <><strong>Note:</strong> The JSON structure must be preserved. You can remove fields you don&apos;t need (missing keys fall back to English), but the nesting hierarchy must remain intact (e.g. <code>component.picker.cancel</code> must be <code>{`{ component: { picker: { cancel: "..." } } }`}</code>).</>
              : <><strong>注意：</strong>JSON 的层级结构必须保持不变。你可以删除不需要翻译的字段（缺失的自动回退英文），但不能改变 key 的嵌套层级关系（如 <code>component.picker.cancel</code> 必须是 <code>{`{ component: { picker: { cancel: "..." } } }`}</code> 这样的结构）。</>
            }
          </div>
          <button
            onClick={handleDownloadTemplate}
            style={{
              padding: '8px 20px', 'font-size': '0.85rem', 'font-weight': 500,
              background: 'var(--sc-color-primary, #1677ff)', color: '#fff',
              border: 'none', 'border-radius': '6px', cursor: 'pointer',
            }}
          >
            {isEn() ? 'Download English Template (JSON)' : '下载英文词条模板 (JSON)'}
          </button>
        </div>

        {/* PhoneI18nDemo is rendered here so it can access PhoneTargetContext from DocLayout */}
        <PhoneI18nDemo />

        <h2 style={SECTION_H2}>{t('i18nPage.basicUsage')}</h2>
        <CodeBlock lang="tsx" code={docCodeBasicUsage} />

        <h2 style={SECTION_H2}>{t('i18nPage.overrideTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          {isEn()
            ? <>You can also <strong>override</strong> specific keys in zh-CN / en-US. User values win on conflict.</>
            : <>你也可以用同样的方式 <strong>覆盖</strong> zh-CN / en-US 中的特定词条。同 key 以用户提供的为准。</>
          }
        </p>
        <CodeBlock lang="tsx" code={docCodeOverride} />

        <h2 style={SECTION_H2}>{t('i18nPage.fallbackTitle')}</h2>
        <div style={{ color: '#6b7280', 'line-height': 1.8 }}>
          <p style={{ margin: '0 0 0.5rem' }}>
            {isEn()
              ? 'When a key is missing in the current locale, the following fallback chain is used:'
              : '当某个 key 在当前语言中不存在时，按以下链路回退：'
            }
          </p>
          <ol style={{ 'padding-left': '1.5rem', margin: '0 0 0.75rem' }}>
            <li>
              {isEn()
                ? <><strong>Current locale</strong> (e.g. <code>ja-JP</code>, including user-provided dictionary)</>
                : <><strong>当前语言</strong>（如 <code>ja-JP</code>，含用户自定义字典）</>
              }
            </li>
            <li>
              {isEn()
                ? <><strong>en-US</strong> (built-in English, as universal fallback)</>
                : <><strong>en-US</strong>（内置英文，作为通用兜底）</>
              }
            </li>
            <li>
              {isEn()
                ? <><strong>Returns the key path</strong> (e.g. <code>component.picker.confirm</code>), with a <code>console.warn</code> emitted (once per key)</>
                : <><strong>返回 key path</strong>（如 <code>component.picker.confirm</code>），同时在控制台输出 <code>console.warn</code>（同一 key 仅警告一次）</>
              }
            </li>
          </ol>
          <p style={{ margin: '0', 'font-size': '0.85rem', color: '#9ca3af' }}>
            {isEn()
              ? <>This means you <strong>don&apos;t need to translate every key at once</strong> — provide what you have, the rest falls back to English. The console warning helps you quickly find which keys still need coverage.</>
              : <>这意味着 <strong>你不需要一次性翻译完所有词条</strong>——传一部分，剩下的自动走英文兜底。控制台的 warning 能帮你快速定位还有哪些 key 没覆盖。</>
            }
          </p>
        </div>

        <h2 style={SECTION_H2}>{t('i18nPage.dictStructureTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          {isEn()
            ? 'Here is the top-level structure of the built-in dictionary. You can override any level as needed:'
            : '以下是内置字典的顶层结构，你可以按需覆盖任意层级的 key：'
          }
        </p>
        <CodeBlock lang="ts" code={docCodeDictStructure} />

        <h2 style={SECTION_H2}>{t('i18nPage.programmaticTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          {isEn()
            ? <>Besides the <code>ProviderConfig</code> prop, you can call <code>setUserMessages()</code> at the app entry:</>
            : <>除了通过 <code>ProviderConfig</code> 的 prop 传入，你也可以在应用入口直接调用 <code>setUserMessages()</code>：</>
          }
        </p>
        <CodeBlock lang="tsx" code={docCodeProgrammatic} />
      </div>
    </DocLayout>
  );
};

export { I18nDocPage };
