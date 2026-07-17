const fs = require('fs');
let s = fs.readFileSync('docs-dev/doc-utils/PropsAttrs.tsx', 'utf8');

// Header: always show Description, hide Type/Default in compact
s = s.replace(
  '<Show when={hasTypes(sec.rows)}><th class={styles.th}>Type</th></Show>\n              <Show when={hasDefaults(sec.rows)}><th class={styles.th}>Default</th></Show>\n              <Show when={!props.compact}><th class={styles.th}>Description</th></Show>',
  '<Show when={!props.compact && hasTypes(sec.rows)}><th class={styles.th}>Type</th></Show>\n              <Show when={!props.compact && hasDefaults(sec.rows)}><th class={styles.th}>Default</th></Show>\n              <th class={styles.th}>Description</th>'
);

// Body rows: same logic
const bodyStart = '<td class={styles.td}><span class={styles.propName}>{row.name}</span></td>';
const bodyOld = bodyStart + `\n                  <Show when={hasTypes(sec.rows)}><td class={${'`'}${'${'}styles.td} ${'${'}styles.typeCell}${'`'}}>{row.type ?? '—'}</td></Show>\n                  <Show when={hasDefaults(sec.rows)}><td class={${'`'}${'${'}styles.td} ${'${'}styles.defCell}${'`'}}>{row.def ?? '—'}</td></Show>\n                  <Show when={!props.compact}><td class={${'`'}${'${'}styles.td} ${'${'}styles.descCell}${'`'}}>{t(row.desc)}</td></Show>`;
const bodyNew = bodyStart + `\n                  <Show when={!props.compact && hasTypes(sec.rows)}><td class={${'`'}${'${'}styles.td} ${'${'}styles.typeCell}${'`'}}>{row.type ?? '—'}</td></Show>\n                  <Show when={!props.compact && hasDefaults(sec.rows)}><td class={${'`'}${'${'}styles.td} ${'${'}styles.defCell}${'`'}}>{row.def ?? '—'}</td></Show>\n                  <td class={${'`'}${'${'}styles.td} ${'${'}styles.descCell}${'`'}}>{t(row.desc)}</td>`;

s = s.replace(bodyOld, bodyNew);

fs.writeFileSync('docs-dev/doc-utils/PropsAttrs.tsx', s);
console.log('Done');
