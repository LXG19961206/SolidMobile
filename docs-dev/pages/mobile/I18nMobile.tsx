import { createSignal, For, Show, type Component } from 'solid-js';
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

/** ── Language configs ── */

interface LangConfig {
  key: string;
  label: string;
  locale: string;
  dict: Record<string, any>;
  pickerTitle: string;
  placeholder: string;
  columns: { text: string; value: string }[][];
  descZh: string;
  descEn: string;
}

const LANG_CONFIGS: LangConfig[] = [
  {
    key: 'ja',
    label: '日本語',
    locale: 'ja-JP',
    dict: {
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
    },
    pickerTitle: '都市選択',
    placeholder: '選択してください',
    columns: [[
      { text: '東京', value: 'tokyo' }, { text: '大阪', value: 'osaka' },
      { text: '京都', value: 'kyoto' }, { text: '札幌', value: 'sapporo' },
      { text: '福岡', value: 'fukuoka' }, { text: '名古屋', value: 'nagoya' },
    ]],
    descZh: '点击下方单元格打开选择器，底部按钮显示日文「キャンセル」「確認」。',
    descEn: 'Tap the cell to open the picker. Bottom buttons show 「キャンセル」「確認」 in Japanese.',
  },
  {
    key: 'ko',
    label: '한국어',
    locale: 'ko-KR',
    dict: {
      'ko-KR': {
        component: {
          picker: { cancel: '취소', confirm: '확인', select: '선택하세요' },
          select: { placeholder: '선택하세요' },
          dialog: { confirmText: '확인', cancelText: '취소' },
          datePicker: { title: '날짜 선택', placeholder: '날짜를 선택하세요' },
          calendar: { confirmText: '확인', placeholder: '날짜 선택' },
          list: { loading: '로딩 중...', empty: '데이터 없음' },
        },
      },
    },
    pickerTitle: '도시 선택',
    placeholder: '선택하세요',
    columns: [[
      { text: '서울', value: 'seoul' }, { text: '부산', value: 'busan' },
      { text: '인천', value: 'incheon' }, { text: '대구', value: 'daegu' },
      { text: '대전', value: 'daejeon' }, { text: '광주', value: 'gwangju' },
    ]],
    descZh: '点击下方单元格打开选择器，底部按钮显示韩文「취소」「확인」。',
    descEn: 'Tap the cell to open the picker. Bottom buttons show 「취소」「확인」 in Korean.',
  },
  {
    key: 'fr',
    label: 'Français',
    locale: 'fr-FR',
    dict: {
      'fr-FR': {
        component: {
          picker: { cancel: 'Annuler', confirm: 'Confirmer', select: 'Sélectionner' },
          select: { placeholder: 'Sélectionner' },
          dialog: { confirmText: 'Confirmer', cancelText: 'Annuler' },
          datePicker: { title: 'Choisir une date', placeholder: 'Sélectionner une date' },
          calendar: { confirmText: 'Confirmer', placeholder: 'Sélectionner une date' },
          list: { loading: 'Chargement...', empty: 'Aucune donnée' },
        },
      },
    },
    pickerTitle: 'Ville',
    placeholder: 'Sélectionner',
    columns: [[
      { text: 'Paris', value: 'paris' }, { text: 'Lyon', value: 'lyon' },
      { text: 'Marseille', value: 'marseille' }, { text: 'Bordeaux', value: 'bordeaux' },
      { text: 'Lille', value: 'lille' }, { text: 'Toulouse', value: 'toulouse' },
    ]],
    descZh: '点击下方单元格打开选择器，底部按钮显示法文「Annuler」「Confirmer」。',
    descEn: 'Tap the cell to open the picker. Bottom buttons show 「Annuler」「Confirmer」 in French.',
  },
];

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

/** ── Single-language Picker demo (isolated state) ── */

const LangPickerDemo: Component<{ config: LangConfig }> = (props) => {
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

/** ── Page ── */

export const I18nMobile: Component<{ components?: ComponentEntry[]; onNavigate?: (key: string) => void }> = (props) => {
  const t = useT();
  const isEn = () => useLocale() === 'en-US';

  // Which languages are toggled on (default: Japanese)
  const [activeLangs, setActiveLangs] = createSignal(new Set<string>(['ja']));

  const toggleLang = (key: string) => {
    setActiveLangs(new Set([key]));
  };

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

      {/* ── Language selector + demo cards ── */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Multi-language Demo' : '多语言演示'}</div>
        <div style={CARD.desc}>
          {isEn() ? 'Select a language to see the Picker in action with that locale:' : '选择语言来查看该语言下的 Picker 效果：'}
        </div>
        <div style={{ ...CARD.body, display: 'flex', gap: '16px', 'flex-wrap': 'wrap', 'padding-top': '8px' }}>
          <style>{`
            .i18n-lang-radio {
              -webkit-appearance: none;
              appearance: none;
              width: 16px; height: 16px;
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
          <For each={LANG_CONFIGS}>
            {(lang) => (
              <label style={{ display: 'flex', 'align-items': 'center', gap: '6px', cursor: 'pointer', 'font-size': '0.85rem', color: 'var(--sc-doc-card-title, #1f2937)' }}>
                <input
                  type="radio"
                  class="i18n-lang-radio"
                  name="lang-demo"
                  checked={activeLangs().has(lang.key)}
                  onChange={() => toggleLang(lang.key)}
                />
                {lang.label}
              </label>
            )}
          </For>
        </div>
        <For each={LANG_CONFIGS}>
          {(lang) => (
            <Show when={activeLangs().has(lang.key)}>
              <div style={{ padding: '0 16px 16px' }}>
                <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'margin-bottom': '10px' }}>
                  {isEn() ? lang.descEn : lang.descZh}
                </div>
                <LangPickerDemo config={lang} />
              </div>
            </Show>
          )}
        </For>
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
