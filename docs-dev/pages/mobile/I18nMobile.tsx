import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { Picker, Cell } from '../../../src/components';
import { ProviderConfig } from '../../../src/config';
import { useT, useLocale } from '../../doc-i18n';

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
  note: { 'font-size': '0.78rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 16px', 'line-height': 1.7 },
};

const PRE = {
  margin: '0 16px 12px', padding: '10px 14px', 'border-radius': '6px',
  background: 'var(--sc-doc-code-bg, #f5f5f5)', color: 'var(--sc-doc-code-text, #374151)',
  'font-size': '0.7rem', 'line-height': '1.45', overflow: 'auto' as const,
  'white-space': 'pre-wrap' as const, 'font-family': 'ui-monospace, monospace',
  border: '1px solid var(--sc-doc-card-border, #e5e7eb)',
};

const jaI18n = {
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認', select: '選択してください' },
      select: { placeholder: '選択してください' },
      dialog: { confirmText: 'OK', cancelText: 'キャンセル' },
      datePicker: { title: '日付選択', placeholder: '日付を選択' },
      calendar: { confirmText: '決定', placeholder: '日付選択' },
      list: { loading: '読み込み中...', empty: 'データなし' },
    },
  },
};

const demoColumns = [[
  { text: '東京', value: 'tokyo' }, { text: '大阪', value: 'osaka' },
  { text: '京都', value: 'kyoto' }, { text: '札幌', value: 'sapporo' },
  { text: '福岡', value: 'fukuoka' }, { text: '名古屋', value: 'nagoya' },
]];

const codeBasicUsage = `import { ProviderConfig } from 'solid-mobile';

const jaMessages = {
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認' },
      dialog: { confirmText: 'OK', cancelText: 'キャンセル' },
      list: { loading: '読み込み中...', empty: 'データなし' },
    },
  },
};

function App() {
  return (
    <ProviderConfig
      config={{ locale: 'ja-JP' }}
      localeMessages={jaMessages}
    >
      <App />
    </ProviderConfig>
  );
}`;

const codeOverride = `import { ProviderConfig } from 'solid-mobile';

const zhOverride = {
  'zh-CN': {
    component: {
      dialog: {
        confirmText: '好的',  // override "确认"
        cancelText: '算了',   // override "取消"
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

const codeProgrammatic = `import { setUserMessages } from 'solid-mobile';

setUserMessages({
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル',
                confirm: '確認' },
    },
  },
});`;

const DICT_STRUCTURE = { ...CARD.note, 'font-family': 'monospace', 'font-size': '0.7rem', 'line-height': 2 };

export const I18nMobile: Component<{ components?: ComponentEntry[]; onNavigate?: (key: string) => void }> = (props) => {
  const t = useT();
  const isEn = () => useLocale() === 'en-US';

  const [showPicker, setShowPicker] = createSignal(false);
  const [pickerLabel, setPickerLabel] = createSignal('');

  return (
    <MobilePreview title={t('nav.i18n') || 'i18n'} components={props.components} onNavigate={props.onNavigate}>
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Internationalization / i18n' : '国际化 / i18n'}</div>
        <div style={CARD.note}>
          {isEn()
            ? <>The component library ships with built-in <strong>zh-CN</strong> and <strong>en-US</strong> dictionaries covering button labels, placeholders, and status text for all components. To add another language (Japanese, Korean, French, ...) or override built-in strings, pass the <code>localeMessages</code> prop.</>
            : <>组件库内置 <strong>zh-CN</strong> 和 <strong>en-US</strong> 两套字典，覆盖所有组件的按钮文案、占位提示、状态标签等。当你需要其他语言（日文、韩文、法文……）或者想覆盖内置词条时，通过 <code>localeMessages</code> prop 传入自定义字典即可。</>
          }
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Japanese Picker Demo' : '日语 Picker 演示'}</div>
        <div style={CARD.desc}>
          {isEn() ? 'Tap the cell below to open the picker. The bottom buttons display 「キャンセル」「確認」 in Japanese.' : '点击下方单元格打开选择器，底部按钮显示日文「キャンセル」「確認」。'}
        </div>
        <div style={CARD.body}>
          <ProviderConfig config={{ locale: 'ja-JP' as any }} localeMessages={jaI18n}>
            <Cell
              title="都市選択"
              value={pickerLabel() || '選択してください'}
              clickable
              onClick={() => setShowPicker(true)}
            />
            <Picker
              columns={demoColumns}
              show={showPicker()}
              onUpdateShow={setShowPicker}
              title="都市選択"
              onChange={(items) => setPickerLabel(items[0]?.text ?? '')}
              onConfirm={(items) => {
                if (items[0]) setPickerLabel(items[0].text ?? '');
                setShowPicker(false);
              }}
              onCancel={() => setShowPicker(false)}
            />
          </ProviderConfig>
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Basic Usage' : '基础用法'}</div>
        <div style={CARD.desc}>
          {isEn() ? <>Set <code>locale</code> and pass <code>localeMessages</code> on <code>ProviderConfig</code>:</> : <>在 <code>ProviderConfig</code> 上设置 <code>locale</code> 并传入 <code>localeMessages</code>：</>}
        </div>
        <pre style={PRE}>{codeBasicUsage}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Override Built-in Locales' : '覆盖内置语言'}</div>
        <div style={CARD.desc}>
          {isEn() ? 'You can also override specific keys in zh-CN / en-US. User values win on conflict.' : '你也可以用同样的方式覆盖 zh-CN / en-US 中的特定词条。同 key 以用户提供的为准。'}
        </div>
        <pre style={PRE}>{codeOverride}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Programmatic Injection' : '程序化注入'}</div>
        <div style={CARD.desc}>
          {isEn() ? <>Besides the <code>ProviderConfig</code> prop, you can call <code>setUserMessages()</code> at the app entry:</> : <>除了通过 <code>ProviderConfig</code> 的 prop 传入，你也可以在应用入口直接调用 <code>setUserMessages()</code>：</>}
        </div>
        <pre style={PRE}>{codeProgrammatic}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Steps' : '使用步骤'}</div>
        <div style={CARD.note}>
          {isEn()
            ? <><strong>1.</strong> Download the <strong>English template</strong> from the desktop docs (JSON format)<br />
              <strong>2.</strong> Replace values with your target language<br />
              <strong>3.</strong> Pass via <code>localeMessages</code> to <code>ProviderConfig</code><br />
              <strong>4.</strong> Preserve the JSON structure; you can omit fields (missing keys fall back to English)</>
            : <><strong>1.</strong> 桌面端文档提供 <strong>英文词条模板下载</strong>（JSON 格式）<br />
              <strong>2.</strong> 将 value 替换为目标语言<br />
              <strong>3.</strong> 通过 <code>localeMessages</code> 传入 <code>ProviderConfig</code><br />
              <strong>4.</strong> JSON 层级必须保持一致，可删减不需要的字段（缺失自动回退英文）</>
          }
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Fallback Strategy' : '回退策略'}</div>
        <div style={CARD.note}>
          {isEn()
            ? <>When a key is missing in the current locale:<br /><br />
              1. <strong>Current locale</strong> (e.g. <code>ja-JP</code>, including user-provided dictionary)<br />
              2. <strong>en-US</strong> (built-in English, as universal fallback)<br />
              3. <strong>Return key path</strong> (e.g. <code>component.picker.confirm</code>), with <code>console.warn</code> (once per key)<br /><br />
              This means you <strong>don't need to translate every key at once</strong> — provide what you have, the rest falls back to English.</>
            : <>当某个 key 在当前语言中不存在时，按以下链路回退：<br /><br />
              1. <strong>当前语言</strong>（如 <code>ja-JP</code>，含用户自定义字典）<br />
              2. <strong>en-US</strong>（内置英文，作为通用兜底）<br />
              3. <strong>返回 key path</strong>（如 <code>component.picker.confirm</code>），同时在控制台输出 <code>console.warn</code>（同一 key 仅警告一次）<br /><br />
              这意味着你<strong>不需要一次性翻译完所有词条</strong>——传一部分，剩下的自动走英文兜底。</>
          }
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Dictionary Structure' : '字典结构速览'}</div>
        <div style={CARD.desc}>
          {isEn() ? <>The following component runtime keys live under <code>component</code>:</> : <><code>component</code> 下包含以下组件的运行时词条：</>}
        </div>
        <div style={DICT_STRUCTURE}>
          picker — cancel, confirm, select, selectDate, selectTime<br />
          dialog — confirmText, cancelText<br />
          select — placeholder<br />
          datePicker — title, panelTitle, placeholder, units<br />
          calendar — weekdays, titleFormatter, startLabel, endLabel, confirmText, placeholder<br />
          list — loading, finished, empty, error<br />
          upload — upload, addFile, pending, uploading, done, error, retry<br />
          pullRefresh — pulling, loosing, loading, success<br />
          stepper — decrement, increment<br />
          tag — close<br />
          loading — label<br />
          cityPicker — title, placeholder<br />
          timePicker — placeholder<br />
          cascader — placeholder
        </div>
      </div>
    </MobilePreview>
  );
};
