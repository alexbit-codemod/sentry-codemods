# Sentry v8 Migrations

This directory contains codemods to assist migration from Sentry v7.x to v8.x.

Recipes:

- `removal-of-addGlobalEventProcessor/`
- `removal-of-void-from-transport-return-types/`
- `removal-Sentry-configureScope-method/`
- `removal-Severity-Enum/`
- `remove-replay-package-and-update-integration/`
- `replace-span-status-from-http-code/`

Maintainers: run fixture tests with:

```bash
npm run test:fixtures
```
