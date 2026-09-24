# @deepseek-ai/dsh-client-ui-brand-devlitus

[English](README.md) | 中文

仅当 `DSH_CLIENT_BUILD_PROFILE` 为 `devlitus` 时，本包才用 devlitus 标志和名称填充 `sidebar.brand.mark`、`sidebar.brand.name` 和 `conversation.hero.brand.mark`，并将文档的 `link[rel="icon"]` 指向同一标志。其他构建仍会加载插件，但不注册 occupant，也不改动标签页图标。使用 `pnpm run build:devlitus` 构建 devlitus 客户端，该命令同时将 `DSH_CLIENT_TITLE` 设为 `devlitus`。

三个占位者沿用 `@deepseek-ai/dsh-client-ui-brand-official` 的方式，通过嵌套的 `slots.inject()` 作为一组声明感知注册安装。标签页图标替换是单独的 effect，其 disposer 会恢复先前的 `href` 和 `type`；若文档原本没有该链接，则将其移除。本包不保留运行时状态。node 半边是空的 Loader seat。

## 模型体验

无，因为本包只贡献浏览器呈现；这里没有任何内容进入模型请求。

#### KV Cache 影响

无；本包既不组装也不发送 provider 请求。

## 已知限制与暂缓事项

- **静态 favicon 仍会发布** —— 在本插件激活之前，`apps/web/public/favicon.svg` 提供鲸鱼图标，因此客户端启动期间标签页可能短暂显示它。
- **浏览器标题相互独立** —— `DSH_CLIENT_TITLE` 在构建期选择标题文字，而不经过 UI slot。
