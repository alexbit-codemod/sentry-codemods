# Sentry Codemod

Codemods to help adopt new Sentry features and handle breaking changes safely. Built in collaboration with [Codemod](https://codemod.com/) ([GitHub](https://github.com/codemod)).

## Quickstart

Caution: These scripts change source code. Commit or stash changes before running.

Run a recipe:

```bash
npx codemod @sentry/<recipe>
```

Local development:

```bash
npx codemod ./recipes/<recipe-id> --dry
```

Common flags:
- `--dry`: preview changes without writing
- `--print`: print proposed edits to stdout
- `--force`: proceed without prompts where applicable

## Available Codemods

- See `recipes/` for available transformations.
- When published, recipes will be invocable via `npx codemod @sentry/<recipe>`.

### Sentry v8

- `@sentry/removal-of-addGlobalEventProcessor`
- `@sentry/removal-of-void-from-transport-return-types`
- `@sentry/removal-Sentry-configureScope-method`
- `@sentry/removal-Severity-Enum`
- `@sentry/remove-replay-package-and-update-integration`
- `@sentry/replace-span-status-from-http-code`

## Repository Structure

```
recipes/
  <recipe-id>/
    meta.json        // name, summary, safety level, tags, options
    transform.ts     // the migration entrypoint (ESM, TypeScript)
    tests/           // fixture-based tests (optional)
    fixtures/        // input/output samples for tests (optional)
utils/
  index.ts           // shared helpers reused by recipes
```

## Conventions

- ESM, TypeScript, Node 20+.
- Keep transforms idempotent and conservative by default.
- Expose user-tunable options with sensible defaults.
- Add `meta.json` with: `name`, `summary`, `safety`, `tags`, `options`.

## Creating a New Recipe

1. Copy `recipes/_template` to `recipes/<recipe-id>`.
2. Update `meta.json` and implement `transform.ts`.
3. Add fixtures and a basic test harness if needed.
4. Validate with `--dry` and `--print` on sample projects.

## Contributing

Contributions welcome. Please open an issue to discuss proposed recipes or improvements.
This project is maintained by Sentry with collaboration from [Codemod](https://codemod.com/) ([GitHub](https://github.com/codemod)).

## License

MIT
