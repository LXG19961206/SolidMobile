import { createSignal, Show, useContext, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { ProviderConfig } from '../../../src/config';
import { Cell, Picker } from '../../../src/components';
import { CodeBlock, DocLayout, PhoneTargetContext } from '../../doc-utils';
import { messages as libMessages } from '../../../src/i18n/dictionaries';

/** Demo content rendered inside the right-side phone simulator via Portal. */
const PhoneI18nDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [showDemo, setShowDemo] = createSignal(false);
  const [demoLabel, setDemoLabel] = createSignal('');
  const demoColumns = [[
    { text: '東京', value: 'tokyo' }, { text: '大阪', value: 'osaka' },
    { text: '京都', value: 'kyoto' }, { text: '札幌', value: 'sapporo' },
    { text: '福岡', value: 'fukuoka' }, { text: '名古屋', value: 'nagoya' },
  ]];
  const jaI18n = {
    'ja-JP': {
      component: {
        picker: { cancel: 'キャンセル', confirm: '確認', select: '選択してください' },
        select: { placeholder: '選択してください' },
      },
    },
  };
  const target = () => phone?.();

  return (
    <Show when={target()}>
      <Portal mount={target()!}>
        <ProviderConfig config={{ locale: ('ja-JP' as any) }} localeMessages={jaI18n}>
          <Cell
            title="都市選択"
            value={demoLabel() || '選択してください'}
            clickable
            onClick={() => setShowDemo(true)}
          />
          <Picker
            columns={demoColumns}
            show={showDemo()}
            onUpdateShow={setShowDemo}
            title="都市選択"
            teleport={target()}
            onChange={(items) => setDemoLabel(items[0]?.text ?? '')}
            onConfirm={(items) => {
              if (items[0]) setDemoLabel(items[0].text ?? '');
              setShowDemo(false);
            }}
            onCancel={() => setShowDemo(false)}
          />
        </ProviderConfig>
      </Portal>
    </Show>
  );
};

const docCodeBasicUsage = `import { ProviderConfig, Picker, Toast, ToastRenderer } from 'solid-mobile';

const jaMessages = {
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認', select: '選択してください' },
      dialog: { confirmText: 'OK', cancelText: 'キャンセル' },
      select: { placeholder: '選択してください' },
      datePicker: { title: '日付選択', placeholder: '日付を選択' },
      calendar: { confirmText: '決定', placeholder: '日付選択' },
      list: { loading: '読み込み中...', empty: 'データなし' },
    },
  },
};

const cityColumns = [[
  { label: '東京', value: 'tokyo' }, { label: '大阪', value: 'osaka' },
]];

function App() {
  return (
    <ProviderConfig
      config={{ locale: 'ja-JP' }}
      localeMessages={jaMessages}
    >
      <Picker
        columns={cityColumns}
        title="都市選択"
      />
      <ToastRenderer />
    </ProviderConfig>
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
      <div class="guide-card">
        <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>国际化 / i18n</h1>
        <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
          组件库内置 <strong>zh-CN</strong> 和 <strong>en-US</strong> 两套字典，覆盖所有组件的按钮文案、占位提示、状态标签等。
          当你需要其他语言（日文、韩文、法文……）或者想覆盖内置词条时，通过 <code>localeMessages</code> prop 传入自定义字典即可。
        </p>

        <h2 style={SECTION_H2}>📥 下载翻译模板</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          点击下方按钮下载组件运行时词条模板（JSON）。<strong>仅包含组件实际使用的文案</strong>
          （Picker、Dialog、Calendar 等的按钮、占位符、状态提示），不含文档站内部词条。
        </p>
        <div style={{
          background: 'var(--sc-doc-card-placeholder, #f3f4f6)',
          'border-radius': '10px', padding: '16px 20px', 'margin-bottom': '0.75rem',
        }}>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'line-height': 1.8, 'margin-bottom': '12px' }}>
            <strong>使用步骤：</strong><br />
            1. 下载模板 → 2. 将英文 value 替换为目标语言 → 3. 通过 <code>localeMessages</code> 传入
          </div>
          <div style={{ 'font-size': '0.8rem', color: '#9ca3af', 'line-height': 1.6, 'margin-bottom': '12px' }}>
            ⚠️ <strong>注意：</strong>JSON 的层级结构必须保持不变。你可以删除不需要翻译的字段（缺失的自动回退英文），
            但不能改变 key 的嵌套层级关系（如 <code>component.picker.cancel</code> 必须是
            <code>{`{ component: { picker: { cancel: "..." } } }`}</code> 这样的结构）。
          </div>
          <button
            onClick={handleDownloadTemplate}
            style={{
              padding: '8px 20px', 'font-size': '0.85rem', 'font-weight': 500,
              background: 'var(--sc-color-primary, #1677ff)', color: '#fff',
              border: 'none', 'border-radius': '6px', cursor: 'pointer',
            }}
          >
            ⬇ 下载英文词条模板 (JSON)
          </button>
        </div>

        {/* PhoneI18nDemo is rendered here so it can access PhoneTargetContext from DocLayout */}
        <PhoneI18nDemo />

        <h2 style={SECTION_H2}>基础用法：添加日语</h2>
        <CodeBlock lang="tsx" code={docCodeBasicUsage} />

        <h2 style={SECTION_H2}>覆盖内置语言</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          你也可以用同样的方式 <strong>覆盖</strong> zh-CN / en-US 中的特定词条。同 key 以用户提供的为准。
        </p>
        <CodeBlock lang="tsx" code={docCodeOverride} />

        <h2 style={SECTION_H2}>缺失词条的回退策略</h2>
        <div style={{ color: '#6b7280', 'line-height': 1.8 }}>
          <p style={{ margin: '0 0 0.5rem' }}>
            当某个 key 在当前语言中不存在时，按以下链路回退：
          </p>
          <ol style={{ 'padding-left': '1.5rem', margin: '0 0 0.75rem' }}>
            <li><strong>当前语言</strong>（如 <code>ja-JP</code>，含用户自定义字典）</li>
            <li><strong>en-US</strong>（内置英文，作为通用兜底）</li>
            <li><strong>返回 key path</strong>（如 <code>component.picker.confirm</code>），同时在控制台输出 <code>console.warn</code>（同一 key 仅警告一次）</li>
          </ol>
          <p style={{ margin: '0', 'font-size': '0.85rem', color: '#9ca3af' }}>
            这意味着 <strong>你不需要一次性翻译完所有词条</strong>——传一部分，剩下的自动走英文兜底。
            控制台的 warning 能帮你快速定位还有哪些 key 没覆盖。
          </p>
        </div>

        <h2 style={SECTION_H2}>内置字典结构参考</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          以下是内置字典的顶层结构，你可以按需覆盖任意层级的 key：
        </p>
        <CodeBlock lang="ts" code={docCodeDictStructure} />

        <h2 style={SECTION_H2}>程序化注入</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>
          除了通过 <code>ProviderConfig</code> 的 prop 传入，你也可以在应用入口直接调用 <code>setUserMessages()</code>：
        </p>
        <CodeBlock lang="tsx" code={docCodeProgrammatic} />
      </div>
    </DocLayout>
  );
};

export { I18nDocPage };
