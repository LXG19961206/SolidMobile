import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { Picker, Cell } from '../../../src/components';
import { ProviderConfig } from '../../../src/config';
import { useT } from '../../doc-i18n';

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
        confirmText: '好的',  // 覆盖 "确认"
        cancelText: '算了',   // 覆盖 "取消"
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

  const [showPicker, setShowPicker] = createSignal(false);
  const [pickerLabel, setPickerLabel] = createSignal('');

  return (
    <MobilePreview title={t('nav.i18n') || 'i18n'} components={props.components} onNavigate={props.onNavigate}>
      <div style={CARD.wrapper}>
        <div style={CARD.title}>国际化 / i18n</div>
        <div style={CARD.note}>
          {t('i18nIntro')}
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>日语 Picker 演示</div>
        <div style={CARD.desc}>
          点击下方单元格打开选择器，底部按钮显示日文「キャンセル」「確認」。
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
        <div style={CARD.title}>{t('guideSection.basics')}</div>
        <div style={CARD.desc}>
          {t('guideSection.basicsDesc')}
        </div>
        <pre style={PRE}>{codeBasicUsage}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.override')}</div>
        <div style={CARD.desc}>
          {t('guideSection.overrideDesc')}
        </div>
        <pre style={PRE}>{codeOverride}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.programmatic')}</div>
        <div style={CARD.desc}>
          {t('guideSection.programmaticDesc')}
        </div>
        <pre style={PRE}>{codeProgrammatic}</pre>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.steps')}</div>
        <div style={CARD.note}>
          <strong>1.</strong> 桌面端文档提供 <strong>英文词条模板下载</strong>（JSON 格式）<br />
          <strong>2.</strong> 将 value 替换为目标语言<br />
          <strong>3.</strong> 通过 <code>localeMessages</code> 传入 <code>ProviderConfig</code><br />
          <strong>4.</strong> JSON 层级必须保持一致，可删减不需要的字段（缺失自动回退英文）
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.fallback')}</div>
        <div style={CARD.note}>
          当某个 key 在当前语言中不存在时，按以下链路回退：<br /><br />
          1. <strong>当前语言</strong>（如 <code>ja-JP</code>，含用户自定义字典）<br />
          2. <strong>en-US</strong>（内置英文，作为通用兜底）<br />
          3. <strong>返回 key path</strong>（如 <code>component.picker.confirm</code>），同时在控制台输出 <code>console.warn</code>（同一 key 仅警告一次）<br /><br />
          这意味着你<strong>不需要一次性翻译完所有词条</strong>——传一部分，剩下的自动走英文兜底。
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('guideSection.dictOverview')}</div>
        <div style={CARD.desc}>
          {t('guideSection.dictOverviewDesc')}
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
