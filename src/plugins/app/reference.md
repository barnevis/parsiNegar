# parsinegar.app Reference

## Purpose

Application plugin for Parsinegar: owns the version-1 route catalog and registers it with the Router service during activation.

## Structure

- `manifest.json` — authoritative plugin contract.
- `index.js` — Bonyan `prepare` and `activate` entry points.

## Dependencies

- **Required:** `pey.router.service` — route registration and navigation state; the plugin has no function without it.
- **Optional:** none.

## Public API

This plugin provides no services (`provides` is empty in the manifest). Its only effect is route registration as a side effect of activation:

```javascript
await activate({ 'pey.router.service': router });
// registers '/' and '/not-found' via router.registerRoutes()
```

## Events

Publishes none. Listens to none.

## Errors Reference

This plugin defines no structured error codes. Activation throws a plain `Error` naming the missing service if `pey.router.service` is absent from the bound services — a defensive check only; after Core settlement a declared required dependency is always bound, so this path is unreachable in normal startup.

## Config

No config keys. The manifest `config` is `{}` and `prepare` ignores its context config.

## Business Rules

- The version-1 route catalog is exactly `'/'` (editor) and `'/not-found'` (fallback slot). Adding a page means adding its pattern here.
- Registration happens in `activate`, never in `prepare`: the Router contract allows `registerRoutes` only during the caller's local activation, after binding.
- Registration is additive and idempotent for these patterns; re-registration of the same patterns changes nothing.

## Constraints

- Do not register routes in `prepare` — no service references exist in that phase and the Router rejects it.
- Do not add provided services here without updating the manifest first; the manifest is the authoritative contract.
- The patterns registered here must stay in sync with the page-loader catalog in `src/ui/index.js`: every owned pattern needs a matching `{ pattern, load, element }` entry, otherwise the router resolves a route the UI cannot mount.
