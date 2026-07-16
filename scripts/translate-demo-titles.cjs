const fs=require('fs'),p=require('path');
const I18N=p.join(__dirname,'..','docs-dev','i18n');

const wordMap={
  'About':'关于','Action':'操作','Add':'添加','Album':'相册','Align':'对齐','All':'全部',
  'Animated':'动画','Animation':'动画','Arrow':'箭头','Async':'异步','Auto':'自动',
  'Back':'返回','Badge':'徽标','Bar':'栏','Basic':'基础','Block':'块级','Blue':'蓝色',
  'Border':'边框','Both':'双向','Bottom':'底部','Button':'按钮','Buy':'购买',
  'Capsule':'胶囊','Card':'卡片','Carousel':'轮播','Cart':'购物车','Cascade':'级联',
  'Cell':'单元格','Center':'居中','Char':'字符','Chart':'图表','Chat':'聊天',
  'Checkbox':'复选框','Children':'子元素','City':'城市','Clearable':'可清除',
  'Click':'点击','Clickable':'可点击','Close':'关闭','Closable':'可关闭',
  'Cloud':'云','Code':'代码','Color':'颜色','Component':'组件','Confirm':'确认',
  'Content':'内容','Continuous':'连续','Controlled':'受控','Controls':'控件',
  'Copy':'复制','Count':'计数','Countdown':'倒计时','Coupon':'优惠券','Crop':'裁剪',
  'Custom':'自定义','Customize':'自定义','Danger':'危险','Dark':'暗色','Dashed':'虚线',
  'Data':'数据','Date':'日期','Decimal':'小数','Deep':'深层','Default':'默认',
  'Delete':'删除','Desc':'描述','Description':'描述','Design':'设计','Dict':'字典',
  'Direction':'方向','Disabled':'禁用','Dismiss':'关闭','Display':'展示','Divider':'分割线',
  'Dot':'红点','Download':'下载','Dual':'双','Dynamic':'动态','Edit':'编辑',
  'Embedded':'嵌入','Empty':'空状态','Error':'错误','Example':'示例','Examples':'示例',
  'Expand':'展开','External':'外部','Fallback':'兜底','Favorite':'收藏','Feedback':'反馈',
  'File':'文件','Fill':'填充','Filter':'筛选','Fit':'填充','Fixed':'固定',
  'Flat':'平铺','Flex':'弹性','Float':'浮动','Fold':'折叠','Font':'字体',
  'Footer':'页脚','Form':'表单','Full':'完整','Gallery':'画廊','Gender':'性别',
  'Ghost':'幽灵','Graph':'图表','Green':'绿色','Grid':'网格','Group':'分组',
  'Half':'半选','Header':'页眉','Height':'高度','Hide':'隐藏','Hint':'提示',
  'Holiday':'节假日','Home':'首页','Horizontal':'水平','Hover':'悬停',
  'Icon':'图标','Image':'图片','Indeterminate':'半选','Indicator':'指示器',
  'Info':'信息','Inline':'行内','Input':'输入','Intro':'介绍','Item':'选项',
  'JSX':'JSX','Label':'标签','Large':'大','Layout':'布局','Lazy':'懒加载',
  'Left':'左侧','Level':'层级','Light':'浅色','Limited':'限制','Line':'线性',
  'Link':'链接','List':'列表','Load':'加载','Loading':'加载','Lock':'锁定',
  'Logo':'Logo','Long':'长','Loop':'循环','Lunar':'农历',
  'Manual':'手动','Mark':'标记','Max':'最大','Medium':'中','Menu':'菜单',
  'Message':'消息','Min':'最小','Mobile':'移动端','Mode':'模式','Month':'月',
  'More':'更多','Multi':'多','Multiple':'多选','Music':'音乐','Name':'名称',
  'Nav':'导航','New':'新建','No':'无','Normal':'普通','Note':'备注',
  'Notice':'通知','Notification':'通知','Notify':'通知','Now':'现在',
  'Number':'数字','Off':'关闭','Offset':'偏移','Online':'在线','Open':'打开',
  'Option':'选项','Options':'选项','Order':'顺序','Other':'其他','Outline':'线框',
  'Overlay':'遮罩','Padding':'内边距','Page':'页面','Password':'密码',
  'Pause':'暂停','Pending':'待处理','Phone':'电话','Photo':'拍照',
  'Picker':'选择器','Pie':'饼图','Placeholder':'占位','Play':'播放','Popup':'弹出',
  'Position':'位置','Preset':'预设','Preview':'预览','Price':'价格','Primary':'主要',
  'Processing':'处理中','Profile':'个人资料','Public':'公开','Pull':'下拉',
  'Pure':'纯','Range':'范围','Rate':'评分','Readonly':'只读','Red':'红色',
  'Refresh':'刷新','Region':'地区','Reload':'重新加载','Remove':'删除',
  'Render':'渲染','Required':'必填','Reset':'重置','Resize':'调整大小',
  'Right':'右侧','Round':'圆形','Row':'行','Safe':'安全','Save':'保存',
  'Scroll':'滚动','Search':'搜索','Second':'秒','Select':'选择','Selected':'已选',
  'Selection':'选择','Semantic':'语义','Send':'发送','Setting':'设置','Shadow':'阴影',
  'Shape':'形状','Share':'分享','Sheet':'面板','Short':'短','Show':'显示',
  'Side':'侧','Simple':'简单','Single':'单选','Size':'尺寸','Slider':'滑块',
  'Small':'小','Solid':'实心','Sort':'排序','Source':'来源','Spacing':'间距',
  'Square':'方形','Standalone':'独立','Star':'星','State':'状态','Static':'静态',
  'Status':'状态','Step':'步长','Stepper':'步进器','Sticky':'粘性','Stop':'停止',
  'Style':'样式','Submit':'提交','Success':'成功','Swipe':'滑动','Switch':'开关',
  'Swiper':'轮播','Sync':'同步','System':'系统','Tab':'标签','Table':'表格',
  'Tag':'标签','Take':'拍照','Target':'目标','Template':'模板','Text':'文字',
  'Textarea':'多行输入','Theme':'主题','Thickness':'粗细','Three':'三',
  'Thumb':'滑块','Time':'时间','Timer':'计时器','Title':'标题','Toast':'轻提示',
  'Today':'今天','Toggle':'切换','Token':'令牌','Tool':'工具','Top':'顶部',
  'Total':'总计','Transition':'过渡','Tree':'树','Trigger':'触发','Triple':'三',
  'Two':'双','Type':'类型','Types':'类型','Typography':'排版',
  'Unchecked':'未选中','Uncontrolled':'非受控','Update':'更新','Upload':'上传',
  'Usage':'用法','User':'用户','Validation':'校验','Value':'值','Variant':'变体',
  'Vertical':'垂直','Video':'视频','View':'查看','Virtual':'虚拟','Visible':'可见',
  'Volume':'音量','Warning':'警告','Watermark':'水印','Week':'周','Weight':'粗细',
  'White':'白色','Width':'宽度','With':'配合','Wrapper':'包裹','Year':'年',
  'Yellow':'黄色','Zoom':'缩放',
};

function translate(text, keyName){
  // Remove obvious prefix (component name prefix from key)
  // Try word-by-word translation
  const words=text.split(/(\s+)/);
  const result=words.map(w=>wordMap[w]||w).join('');
  // If result === text, try camelCase splitting
  if(result===text){
    const camel=text.replace(/([a-z])([A-Z])/g,'\$1 \$2');
    const camelTranslated=camel.split(/(\s+)/).map(w=>wordMap[w]||w).join('');
    if(camelTranslated!==camel)return camelTranslated;
  }
  return result;
}

let total=0;
for(const f of fs.readdirSync(I18N,{recursive:true})){
  if(!f.endsWith('zh-CN.ts'))continue;
  const fp=p.join(I18N,f);
  let s=fs.readFileSync(fp,'utf8');
  const lines=s.split('\n');
  let inDemo=false, changed=false;
  const out=[];
  for(let i=0;i<lines.length;i++){
    const l=lines[i];
    if(l.includes('    demo: {')){inDemo=true;out.push(l);continue}
    if(inDemo && l.includes('    },')){inDemo=false;out.push(l);continue}
    if(!inDemo){out.push(l);continue}
    const m=l.match(/^(\s+)(\w+)(: ')([^']+)('.*)$/);
    if(!m){out.push(l);continue}
    const [,indent,key,,value,rest]=m;
    if(/[一-鿿]/.test(value)){out.push(l);continue}
    const cn=translate(value,key);
    if(cn!==value){changed=true;total++;out.push(`${indent}${key}: '${cn}'${rest}`)}
    else out.push(l);
  }
  if(changed)fs.writeFileSync(fp,out.join('\n'),'utf8');
}
console.log('Translated '+total+' demo titles');
