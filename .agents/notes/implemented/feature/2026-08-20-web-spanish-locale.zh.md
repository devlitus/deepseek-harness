# Agent Note: 西班牙语成为 Web 客户端第三个随附 locale

Status: implemented

[English](2026-08-20-web-spanish-locale.md) | 中文

## Problem

Web 客户端此前随附两个 locale（`zh`、`en`）。西班牙语浏览器在主子标签匹配中落空，回落到 `FALLBACK_LOCALE`（`en`），而设置里的语言行也没有西班牙语选项——阅读西班牙语的用户无从以西班牙语使用界面。

## Decision

**`es` 成为第三个随附 locale，与既有两个完全对称。** `LOCALE_IDS` 增加 `'es'`（持久化的 `locale.preference` schema 随之接受它）；运行时的 locale 列表增加 `{ id: 'es', label: 'Español' }`；`DOCUMENT_LANGUAGE` 把它映射为不带区域的 BCP 47 标签 `es`。每个随附命名空间的字典都增加一份 `es` 副本，沿用既有的编译期约定（`satisfies Record<XKey, string>` 或该文件已有的等价写法）对照 zh key 集合校验完整性，每个类型化 `register(ns, { zh, en })` 调用改为 `{ zh, en, es }`。[locale 全量铺开的 note](../architecture/2026-07-30-client-locale-full-rollout.md) 拥有字典规范形态与不翻译边界；本次改动只增加一门语言，两者都不动。

**奇偶门禁改为按三元组分组。** `scripts/locale-dictionary-parity.spec.ts` 在每种发现形态中都接纳 `es`（`es`、`esSettings`、`settingsEs`、内联 `register(NS, 'es', {...})`，以及两个及以上条目的字典数组），并要求每一组都持有 key 集合完全一致的 `zh`、`en`、`es`。[共用的 `FALLBACK_LOCALE` 常量](2026-07-31-browser-derived-initial-locale.md) 所依赖的正是这个门禁，因此它必须覆盖运行时能激活的每个 locale——类型化注册只在编译期强制完整性，覆盖不到内联形态。

西班牙语浏览器探测复用既有的主子标签遍历（`es-MX` → `es`），机制无任何改动；语言行菜单随之变为三项，组件也无须改动，因为它渲染的是服务的 locale 列表。

## Alternatives considered

- **让西班牙语浏览器回落到英文**：零代码，但把庞大的读者群体留在他们可能读不懂的语言上；locale 接缝本就存在，第三个 locale 的成本在字典而非机制。
- **随附 `es` 字典但不扩展奇偶门禁**：内联与拆分文件的字典形态逃得出类型化 `register` 重载，只有扫描式门禁能覆盖它们；扩展为三元组能让所有形态共用一个强制点。
- **按地区拆分西班牙语变体（`es-ES`／`es-419`）**：一份中性的 `es` 字典即可覆盖所有主子标签命中；按地区拆分只会为尚不存在的消费者复制每本字典。

## Consequences

- 新增一个字典 key 意味着写三份译文；编译期 key 集合校验与奇偶门禁都会拒绝只加一部分的提交。
- `<html lang>` 增加 `es` 映射，无障碍技术与浏览器功能因而能像跟踪其他切换一样跟踪西班牙语界面。
- e2e 准则不变：浏览器场景固定 `zh-CN` 或 `en-US` 页面，且没有 golden 枚举 locale 列表。
