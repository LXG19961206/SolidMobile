import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';

export const CodeBlock = (props: { code: string; lang?: string }) => {
  const html = () => {
    const langName = props.lang || 'jsx';
    const lang = Prism.languages[langName] || Prism.languages.jsx;
    return Prism.highlight(props.code, lang, langName);
  };
  return (
    <div class="doc-code-block">
      <pre class={`language-${props.lang || 'jsx'}`}>
        <code class={`language-${props.lang || 'jsx'}`} innerHTML={html()} />
      </pre>
    </div>
  );
};
