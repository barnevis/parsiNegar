# parsinegar.app

Application plugin for Parsinegar: owns the version-1 route catalog and registers it with the Router service during activation.

## Structure

- `manifest.json` — authoritative plugin contract.
- `index.js` — Bonyan `prepare` and `activate` entry points.

## Dependencies

- **Required:** `pey.router.service` — route registration and navigation state; the plugin has no function without it.
- **Optional:** none.

## See Also

See [`reference.md`](reference.md) for the full API/events/errors/config/business-rules/constraints reference.
