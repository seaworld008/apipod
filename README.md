# apipod-clone（前端复刻壳子 / Mock）

该工程用于“对照复刻”站点的信息架构、路由与交互骨架：

- 默认不内置原站素材与全文文案（避免把外部内容直接写进仓库）。
- 所有“后端接口”统一由 Mock 数据与 Next.js Route Handlers 提供，后续可替换为真实后端。

> 说明：如果你要做到“文字/图片完全一致”，请由你提供有授权的文案与资产包（或由对方提供导出），我可以把它们接入 `public/` 与 `src/content/` 中做像素级对齐。

## 运行

```bash
pnpm dev
```

访问：

- `http://localhost:3000/`
- `http://localhost:3000/zh-CN`
- `http://localhost:3000/models`
- `http://localhost:3000/docs`

## 对照采集（可选）

如果你需要更系统地对齐 UI/路由/交互（不把外部文案写进仓库），可运行：

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/apipod-site-audit.mjs --limit 10
```

输出目录为 `reference/apipod.ai/audit/<timestamp>/`（截图 + 交互元素元数据）。

本地全量审计（66 条 sitemap 路由）：

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/apipod-clone-audit.mjs --mode start --port 3122
```

局部审计（更快）：使用 `reference/apipod.ai/pages_subset_remaining.json` 之类的子集文件：

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/apipod-clone-audit.mjs --mode start --port 3122 --pages ../../reference/apipod.ai/pages_subset_remaining.json
```

## Mock 接口

示例（可直接 `curl` 验证）：

```bash
curl -s http://localhost:3000/api/auth/get-session
curl -s http://localhost:3000/api/models | head
curl -s http://localhost:3000/api/changelog
```

## 切换到真实后端（预留）

- 通过 `NEXT_PUBLIC_BACKEND_BASE_URL` 指向真实后端（例如 `https://api.example.com`）。
- 当前页面示例主要调用 `"/api/..."`（本地 Mock）；后续可逐步把页面请求迁移到真实后端的路径。

## 目录索引

- `src/app/(marketing)/`：营销站页面（含 `/models` 等）。
- `src/app/docs/`：文档站骨架（`/docs/**`）。
- `src/app/zh-CN/`：中文路由镜像（`/zh-CN/**`）。
- `src/mock/`：Mock 数据源（模型/文档/更新日志等）。
- `src/app/api/`：Mock API（Next.js Route Handlers）。
