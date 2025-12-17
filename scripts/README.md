# scripts

## apipod-site-audit

`apipod-site-audit` 用于“对照采集”线上站点页面，用来指导 UI/路由/交互复刻：

- 输出到 `reference/apipod.ai/audit/<timestamp>/`
- 保存 **全页截图**（用于视觉对照）
- 保存 **交互元素元数据**（只保存文本长度/哈希，不保存原文案，避免把外部内容写进仓库）

运行示例（macOS）：

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/apipod-site-audit.mjs --limit 10
```
