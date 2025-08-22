<img
  src=".github/assets/sentry-codemods.png"
  alt="Sentry SDDK Migration Codemods"
/>

Codemods to help adopt new Sentry features and handle breaking changes safely. Built in collaboration with [Codemod](https://codemod.com/) ([GitHub](https://github.com/codemod)).

## Quickstart

Caution: These scripts change source code. Commit or stash changes before running.

Run a codemod from the registry:

```bash
npx codemod@latest sentry/vX/<codemod-name>
```

- See the [Codemod CLI reference](https://docs.codemod.com/cli/cli-reference) for full usage.
- This repository hosts documentation and directory structure only; codemods themselves are published packages.

## What lives here

- `codemods/`: placeholders (by major version) where codemod packages may be added.
- `codemods/vX/migration-recipe/`: optional “recipe” (a daisy-chained orchestration of codemods). A recipe is not a single codemod.
- No engine-specific transforms are stored in this repo.

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
- Codemods are published and run via `npx codemod@latest sentry/vX/<codemod-name>`.
- “Recipe” refers to a daisy-chained flow that orchestrates multiple codemods.

## Contributing

Contributions welcome. Please open an issue to discuss proposed codemods or improvements.
This project is maintained by Sentry with collaboration from [Codemod](https://codemod.com/) ([GitHub](https://github.com/codemod)).

## License

MIT
