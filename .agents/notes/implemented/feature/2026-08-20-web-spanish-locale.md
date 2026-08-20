# Agent Note: Spanish as a third shipped web locale

Status: implemented

English | [中文](2026-08-20-web-spanish-locale.zh.md)

## Problem

The web client shipped two locales (`zh`, `en`). A Spanish-language browser fell through primary-subtag detection to `FALLBACK_LOCALE` (en), and the Language settings row offered no Spanish option, so Spanish-reading users had no way to use the UI in Spanish.

## Decision

**`es` is a third shipped locale, symmetric with the existing two.** `LOCALE_IDS` gains `'es'` (the durable `locale.preference` schema accepts it); the runtime's locale list adds `{ id: 'es', label: 'Español' }`; `DOCUMENT_LANGUAGE` maps it to the bare BCP 47 tag `es`. Every shipped namespace dictionary gains an `es` copy checked complete against the zh key set by the same compile-time convention (`satisfies Record<XKey, string>`, or the file's existing equivalent), and every typed `register(ns, { zh, en })` call becomes `{ zh, en, es }`. [The locale rollout note](../architecture/2026-07-30-client-locale-full-rollout.md) owns the dictionary canon and the non-translation boundary; this change adds a language and alters neither.

**The parity gate now groups triples.** `scripts/locale-dictionary-parity.spec.ts` admits `es` in every discovery shape (`es`, `esSettings`, `settingsEs`, inline `register(NS, 'es', {...})`, and dictionary arrays of two or more pairs) and requires each group to hold `zh`, `en`, and `es` with identical key sets. That gate is what [the shared `FALLBACK_LOCALE` constant](2026-07-31-browser-derived-initial-locale.md) rests on, so it must cover every locale the runtime can activate — typed registrations enforce completeness only at compile time and miss the inline shapes.

Spanish browser detection rides the existing primary-subtag walk (`es-MX` → `es`) with no mechanism change, and the Language row menu grows to three entries with no component change because it renders the service's locale list.

## Alternatives considered

- **Let Spanish browsers fall back to English**: zero code, but leaves a large reader population on a language they may not read; the locale seam already exists, so the cost of a third locale is dictionaries, not machinery.
- **Ship `es` dictionaries without extending the parity gate**: inline and split-file dictionary shapes escape the typed `register` overload, so only the sweep gate covers them; extending it to triples keeps one enforcement point for all shapes.
- **Regional Spanish variants (`es-ES`/`es-419`)**: one neutral `es` dictionary covers every primary-subtag match; regional splits would duplicate every dictionary for no current consumer.

## Consequences

- Adding a dictionary key now means writing three translations; the compile-time key-set check and the parity gate reject partial additions.
- `<html lang>` gains the `es` mapping, so assistive technology and browser features track a Spanish UI like any other switch.
- e2e doctrine is unchanged: browser scenarios pin `zh-CN` or `en-US` pages, and no golden enumerates the locale list.
