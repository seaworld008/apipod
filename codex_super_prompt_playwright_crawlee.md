# Codex 超级提示词（Playwright + Crawlee：**仅用于你拥有或明确获授权的网站**）


## 你的角色
你是资深全栈工程师 + 爬虫工程师 + 前端架构师。你将交付一套可运行的“**公开页面抓取 → 交互展开内容采集 → 资产下载（在授权前提下）→ 前端静态复刻工程 → API Mock 层**”的完整代码与文档。

---

## 最终目标
实现一个可复用的工具链（Node.js/TypeScript）：

1. 使用 **Crawlee + Playwright** 递归抓取目标站点（仅同域名）公开页面。
2. 对每个页面执行**安全的交互探索**：滚动、展开、分页、Tab 切换、加载更多等（只允许“非破坏性按钮/链接”）。
3. 把每个“页面状态（state）”保存下来：  
   - URL（如有变化）/ stateId（无 URL 变化也要区分）  
   - 最终渲染 HTML（`page.content()`）  
   - 关键 DOM 结构摘要（用于生成组件）  
   - 全页截图 + 关键组件截图（可选）  
   - 下载静态资源（图片、svg、字体、css、js）到本地（**仅授权前提**）  
   - 录制网络请求（HAR 或自定义 Network log）用于识别接口并生成 mock
4. 自动生成一个**前端复刻工程**（推荐 Next.js 或 Vite + React）：  
   - 路由结构与页面结构与抓取的公开页面一致  
   - 样式尽量贴近（优先保留/复用原站 CSS 变量与 token；必要时补充 Tailwind config 或 CSS Modules）  
   - 图片/字体等静态资源本地化引用  
5. 对存在接口的页面：基于网络日志自动生成 **Mock API**（MSW 推荐）：  
   - 按真实路径、方法、参数、响应结构生成 mock handler  
   - 支持通过 `fixtures/*.json` 可编辑数据  
   - 前端默认对接 mock，后续可替换为真实接口

---

## 强约束（必须严格遵守） 
- 必须速率限制：并发 ≤ 5，页面间延迟 500–1500ms 随机抖动
- 代码必须是 TypeScript，包含严格错误处理与可观测性（日志、重试、超时、截图留档）
- 输出内容必须可复现：每次运行可得到结构一致的 `crawl-data/` 与 `repro-app/`

---

## 输入参数（CLI）
实现 `pnpm crawl` 命令，支持：
- `--baseUrl <url>`：目标站点根（例如 `https://example.com`）
- `--maxDepth <n>`：递归深度（默认 5）
- `--maxPages <n>`：最大页面数（默认 500）
- `--respectRobots <true|false>`：默认 true
- `--downloadAssets <true|false>`：默认 true（但必须 `I_HAVE_RIGHTS=true` 才允许）
- `--headless <true|false>`：默认 true
- `--outDir <dir>`：默认 `./crawl-data`
- `--reproDir <dir>`：默认 `./repro-app`

环境变量：
- `I_HAVE_RIGHTS=true`（必须，否则直接退出）
- `TARGET_DOMAIN_ALLOWLIST`（可选，默认从 baseUrl 提取）

---

## 交付物目录结构（必须生成）
```
/crawler/
  src/
  package.json
  tsconfig.json
/crawl-data/
  pages/
    <pageId>/
      meta.json
      page.html
      screenshot.png
      screenshots/
      assets/
      network.har (或 network.json)
      dom-summary.json
  sitemap.json
  errors.log
/repro-app/
  (Next.js 或 Vite + React 工程)
/mocks/
  msw/
    handlers.ts
    fixtures/
    README.md
README.md
```

---

## 实现要求（详细）
### A. Crawlee + PlaywrightCrawler 抓取与递归
1. 只允许同域名 URL 入队：
   - 过滤 `mailto:`, `tel:`, `javascript:`
   - 去重：规范化 URL（去 hash、排序 query 可选）
2. 在 `requestHandler` 中：
   - 打开页面，等待网络空闲（`networkidle`）+ 关键元素（如 `body`）
   - 运行交互探索（见 B），获得若干 state
   - 对每个 state：
     - 保存 HTML、截图、DOM 摘要、网络日志、发现的新链接入队
3. 失败重试：
   - 每个 request 最多重试 2 次
   - 对超时、导航失败、脚本错误要保留截图与错误栈到 `crawl-data/errors.log`

### B. “安全交互探索”算法（必须实现）
目标：把“需要点击/滚动才出现的公开内容”抓出来，但不做任何破坏性操作。

执行顺序（每页）：
1. **滚动探索**：滚动到底 3–6 次（带随机延迟），触发懒加载
2. **展开探索**：寻找候选点击元素（白名单规则），逐个尝试点击：
   - 点击前记录 DOM hash（或关键容器的 innerHTML hash）
   - 点击后等待动画/请求完成（`waitForTimeout(300-800)` + `networkidle`）
   - 若 URL 变化（同域）或 DOM hash 变化显著，则记录为新 state
3. **分页/下一页**：若存在 next/prev（白名单关键词），最多点击 5 次并记录 states
4. **Tab 切换**：识别 `role=tab` 或具有 tab 语义的按钮，逐个切换并记录 states

必须实现“安全阈值”：
- 每页最多点击 60 次
- 每个 selector 最多点击 2 次（避免死循环）
- 任何点击若触发表单提交/下载/外域跳转：立刻撤销（`page.goBack()`）并标记黑名单

### C. 资产下载（仅授权前提）
当 `I_HAVE_RIGHTS=true` 且 `--downloadAssets=true`：
- 下载并本地化引用：
  - `<img src>`, `<source srcset>`, CSS `url(...)` 中的图片/字体
  - SVG 文件
- 保存到 `crawl-data/pages/<id>/assets/` 并生成映射表 `asset-map.json`
- 对于跨域 CDN 资产：允许下载，但必须保留原 URL 记录；若失败则降级为引用原 URL

### D. 网络日志与 Mock 生成（MSW）
1. 记录 XHR/fetch 请求：方法、URL、query、request body、response status、响应 JSON（若可读）
2. 分类输出：
   - `network.json`：每个 state 的请求清单
   - `mocks/msw/handlers.ts`：按 endpoint 生成 handler
   - `mocks/msw/fixtures/*.json`：按 endpoint 保存响应样本（可编辑）
3. 规则：
   - 只 mock **同域 API** 或明确的公开 API 域名（由 allowlist 控制）
   - 对含 token/cookie 的敏感字段要脱敏（mask）
   - 前端请求统一走 `fetch`，并可通过环境变量切换 mock/real

### E. 复刻前端工程生成
生成 `repro-app/`（推荐 Next.js App Router）：
- 路由：按抓取到的公开页面 URL path 生成
- 每个页面：
  - 优先使用“可复用组件”拆分：Header/Footer/Nav/Hero/Sections
  - 页面内容优先来自抓取的 DOM summary + 文本与结构（避免直接照搬第三方品牌元素；若你有授权则可保留）
- 样式策略（按优先级）：
  1) 复制 CSS 变量/token（若公开可见且授权）到 `globals.css`
  2) 复用下载到本地的字体/图片
  3) 必要时用 Tailwind 生成等价样式；禁止引入大型 UI 框架改变外观
- 增加视觉回归测试：
  - 对每个页面生成对比截图：原站截图 vs repro 截图
  - 使用 `pixelmatch` 生成 diff，输出报告 `visual-report/`

---

## 你必须输出的内容（Codex 交付清单）
1. 完整可运行代码（crawler + repro-app + mocks）
2. `README.md`：从零到跑通的步骤（安装、配置、命令、输出解释、常见问题）
3. 风险与限制说明（动态内容、第三方脚本、字体渲染差异等）
4. 示例命令：
   - `pnpm crawl -- --baseUrl https://example.com --maxDepth 5 --maxPages 300`
   - `pnpm repro:dev`（启动复刻站）
   - `pnpm test:visual`（跑视觉 diff）

---

## 编码规范与质量门槛
- TypeScript `strict: true`
- 所有 I/O、网络请求、文件写入必须显式 try/catch
- 日志分级：info/warn/error，关键路径打印 requestId/pageId/stateId
- 任何异常都要在 `crawl-data/errors.log` 留痕并保留截图（如可）
- 不要硬编码站点特定 selector；使用“可配置规则 + 默认启发式”

---

## 立即开始：你需要做的第一步
1) 初始化 monorepo（pnpm workspace）：
- `packages/crawler`
- `packages/repro-app`
- `packages/mocks`

2) 先把 crawler 跑通并产出 `crawl-data/`，再做 repro-app 生成。

---

## 额外要求（可选但强烈建议）
- Playwright trace：对部分失败页面保存 trace.zip 便于调试
- 断点续跑：支持读取已有 `sitemap.json`，避免重复抓取
- 去重策略：URL 去重 + state 去重（DOM hash）

---

## 重要安全开关（必须实现）
程序启动时检查：
- 如果 `process.env.I_HAVE_RIGHTS !== "true"`：
  - 打印清晰错误：本工具仅用于你拥有或已获授权的网站
  - 退出码非 0

---

## 输出风格要求
你在实现中不要写空泛解释；所有说明必须可执行、可复现、可验证。优先给出代码与命令，再给解释。
