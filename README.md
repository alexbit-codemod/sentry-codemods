<img
  src=".github/assets/sentry-codemods.png"
  alt="Sentry SDK Migration Codemods"
/>

This repo contains community-led official codemods approved by the Sentry team to help users adopt new SDK features and handle breaking changes safely and easily.

## Quickstart

Caution: These scripts change source code. Commit or stash changes before running.

Run a codemod from the registry:

```bash
npx codemod@latest @sentry/<codemod-name>
```

- See the [Codemod CLI reference](https://docs.codemod.com/cli/cli-reference) for full usage.

## What lives here

- `codemods/`: placeholders (by major version) where codemod packages may be added.
- `codemods/vX/migration-recipe/`: optional “recipe” (a daisy-chained orchestration of codemods). A recipe is not a single codemod.

## Repository Structure

```
codemods/
  vX/
    <codemod-name>/            # optional: package placeholder (no source kept here)
    migration-recipe/          # optional: orchestration, when applicable
utils/
  index.ts                     # shared helpers for docs/tools (no transforms)
```

## Conventions

- ESM, TypeScript, Node 20+ for any helper tooling kept here.
- Codemods are published and run via `npx codemod@latest @sentry/<codemod-name>`.
- “Recipe” refers to a daisy-chained flow that orchestrates multiple codemods.

## Contributing

Contributions welcome. Please open an issue to discuss proposed codemods or improvements.

## License

MIT
