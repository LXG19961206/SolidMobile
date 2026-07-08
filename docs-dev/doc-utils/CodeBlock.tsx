import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/themes/prism.css';

export const CodeBlock = (props: { code: string; lang?: string }) => {
  const html = () => {
    const lang = Prism.languages[props.lang || 'tsx'] || Prism.languages.tsx;
    return Prism.highlight(props.code, lang, props.lang || 'tsx');
  };
  return (
    <div class="doc-code-block">
      <pre class={`language-${props.lang || 'tsx'}`}>
        <code class={`language-${props.lang || 'tsx'}`} innerHTML={html()} />
      </pre>
    </div>
  );
};
