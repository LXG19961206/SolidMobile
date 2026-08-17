import{m as T,by as c,c as t,r as m,bz as v,bA as r,i as n,P as p,F as C,D as h,a as D,t as g}from"./index-YBn7yUdg.js";var x=g('<div style="padding:24px 32px;max-width:960px;margin:0 auto"><h1 style="font-size:1.75rem;font-weight:700;margin:0 0 4px">Tabs</h1><p style="font-size:0.9rem;color:#6b7280;margin:0 0 24px"></p><h2 style="font-size:1.1rem;font-weight:600;margin:24px 0 12px">Demos');m({"zh-CN":r,"en-US":v});const S=()=>{const e=T(),{propsTables:b}=c(),s=[{title:e("tabs.demo.line"),code:`<Tabs>
  <Tab title="Tab 1" name="a"><div>Content 1</div></Tab>
  <Tab title="Tab 2" name="b"><div>Content 2</div></Tab>
  <Tab title="Tab 3" name="c"><div>Content 3</div></Tab>
</Tabs>`,desc:e("tabs.demoDesc.line")},{title:e("tabs.demo.scrollable"),code:`<Tabs>
  <Tab title="First" name="a"><div>A</div></Tab>
  <Tab title="Second" name="b"><div>B</div></Tab>
  <Tab title="Third" name="c"><div>C</div></Tab>
  <Tab title="Fourth" name="d"><div>D</div></Tab>
  <Tab title="Fifth" name="e"><div>E</div></Tab>
  <Tab title="Sixth" name="f"><div>F</div></Tab>
  ...
</Tabs>`,desc:e("tabs.demoDesc.scrollable")},{title:e("tabs.demo.jsxTitle"),code:`<Tabs>
  <Tab title={<span>🔔 Notifications</span>} name="a"><div>Content</div></Tab>
  <Tab title={<span>⚙ Settings</span>} name="b"><div>Content</div></Tab>
</Tabs>`,desc:e("tabs.demoDesc.jsxTitle")},{title:e("tabs.demo.card"),code:`<Tabs type="card">
  <Tab title="Option 1" name="a"><div>Content 1</div></Tab>
  <Tab title="Option 2" name="b"><div>Content 2</div></Tab>
  <Tab title="Option 3" name="c"><div>Content 3</div></Tab>
</Tabs>`,desc:e("tabs.demoDesc.card")},{title:e("tabs.demo.color"),code:`<Tabs color="#22c55e" titleActiveColor="#22c55e">
  <Tab title="Green" name="a"><div>Green content</div></Tab>
  <Tab title="Tabs" name="b"><div>Tab content</div></Tab>
</Tabs>`,desc:e("tabs.demoDesc.color")},{title:e("tabs.demo.controlled"),code:`const [active, setActive] = createSignal("a");

<Tabs active={active()} onChange={setActive}>
  <Tab title="Tab 1" name="a"><div>Content 1</div></Tab>
  <Tab title="Tab 2" name="b"><div>Content 2</div></Tab>
  <Tab title="Tab 3 (Disabled)" name="c" disabled><div>Content 3</div></Tab>
</Tabs>
<div>Active: {active()}</div>`,desc:e("tabs.demoDesc.controlled")},{title:e("tabs.demo.disabled"),code:`<Tabs>
  <Tab title="Normal" name="a" />
  <Tab title="Disabled" name="b" disabled />
  <Tab title="Normal" name="c" />
</Tabs>`,desc:e("tabs.demoDesc.disabled")}];return t(D,{get children(){var a=x(),d=a.firstChild,i=d.nextSibling,o=i.nextSibling;return n(i,()=>e("tabs.intro")),n(a,t(p,{propsTables:b}),o),n(a,t(C,{each:s,children:l=>t(h,{demo:l})}),null),a}})};export{S as TabsDocPage};
