# uvn — 前端项目的环境胶水层

> 受到 Python `uv` 的启发，做前端生态的 `uv`。

## 问题

前端开发环境配置碎片化，每个新人的第一天都在跟工具链打仗：

1. Node 版本不匹配（nvm 全局管理，切来切去，新人 `npm install` 报错才知道版本不对）
2. 包管理器不统一（README 里写"推荐 pnpm"，全靠自觉）
3. 镜像源需要手动配（换电脑、换网络就挂，跟项目走不了）
4. lockfile 不跨工具（yarn.lock 和 package-lock.json 共存但不同步，深层依赖版本漂移导致"你那边能跑" bug）

这些点的现有工具（nvm/fnm/volta、npm/yarn/pnpm、nrm/yrm）各自为战，互相不对话。

## 核心设计

### 以 `package.json` 为锚点

所有配置放在 `package.json` 的 `uvn` 字段里，项目级声明、git 可追踪：

```json
{
  "uvn": {
    "nodeVersion": "22",
    "npmType": "pnpm",
    "mirrorUrl": "auto",
    "run": "npm run dev"
  }
}
```

### 核心命令

```
uvn run dev
  → 读取 nodeVersion → 切换到对应 Node 版本（环境变量 PATH）
  → 调用声明的包管理器执行 script
  → 不侵入项目：npm run dev 依旧能跑，uvn 只是帮你把环境准备好

uvn install
  → 首次执行时自动测速：HEAD 各主流镜像站（npmmirror、npmjs、yarnpkg...）→ 选最快的一个写入 mirrorUrl
  → 调用声明的包管理器执行 install
  → 用户可随时改为手动指定

uvn add react
uvn remove lodash
  → 统一命令方言，uvn 翻译成对应包管理器的 add/install/remove 命令
  用户不需要记住 pnpm add / yarn add / npm install 的区别
```

### 关键设计决策

- **不侵入项目**：`npm run dev` 依然可以正常工作，uvn 不强占入口，只在入口前加一层环境准备
- **项目级 node 版本**：Node 版本号显式声明在 `package.json` 里，不再是"前任开发者的大脑里"
- **自动测速镜像**：国内刚需——首次 `uvn install` 自动选最快的源，不再需要手动 `nrm test`
- **锁定"哪个锁定工具在锁定版本"**：声明 `npmType` 消除 yarn/npm/pnpm 混用导致的一致性问题

## 未来方向：固化依赖 (`uvn freeze`)

对于一些陈年老项目或内网离线场景，需要"一个能完整复现的项目文件夹"：

```
uvn freeze → 将所有依赖 tarball 归档到本地 → 产出可离线安装的项目快照
uvn install --frozen → 从本地归档安装，不走 registry
```

分三层（建议只做第一层）：

| 层 | 内容 | 难度 |
|----|------|------|
| tarball 归档 | 所有依赖的 `.tgz` 物理文件存在本地 | 低，几百行 |
| 原生模块跨平台 | esbuild/sharp 等 native binary 在不同 CPU 架构间迁移 | 极高（Docker/Nix 级别） |
| 系统级依赖 | puppeteer 要 Chromium、canvas 要 libcairo | 极高 |

建议第一层就够了——**锁定源码依赖不消失**，跨平台的坑交给 registry 重新下载对应平台的包。

## 技术选型

- **Go 语言**：单二进制分发，不需要用户装任何运行时；goroutine 天然适合并发 HTTP 测速
- **核心代码量估计**：~500 行（读 package.json + 环境变量操作 + 并发 HTTP 测速 + 命令翻译 + 包管理器调用）
- 依赖：Go 标准库即可（`encoding/json`、`net/http`、`os/exec`、`sync`）
