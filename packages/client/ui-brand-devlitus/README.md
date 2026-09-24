# @deepseek-ai/dsh-client-ui-brand-devlitus

English | [中文](README.zh.md)

This package fills `sidebar.brand.mark`, `sidebar.brand.name`, and `conversation.hero.brand.mark` with the devlitus mark and name, and points the document's `link[rel="icon"]` at the same mark, only when `DSH_CLIENT_BUILD_PROFILE` is `devlitus`. Other builds load the plugin but register no occupants and leave the tab icon unchanged. Build a devlitus client with `pnpm run build:devlitus`, which also sets `DSH_CLIENT_TITLE` to `devlitus`.

The three occupants install as one declaration-aware registration set through nested `slots.inject()` calls, following `@deepseek-ai/dsh-client-ui-brand-official`. The tab icon replacement is a separate effect whose disposer restores the previous `href` and `type`, or removes the link when the document had none. The package retains no runtime state. The node half is an empty Loader seat.

## Model Experience

None, as the package contributes browser presentation only; nothing here reaches a model request.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

- **The static favicon still ships** — `apps/web/public/favicon.svg` serves the whale until this plugin activates, so the tab can show it briefly while the client boots.
- **The browser title is independent** — `DSH_CLIENT_TITLE` selects title text at build time rather than through a UI slot.
