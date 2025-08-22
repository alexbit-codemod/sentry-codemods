# Contributing

Thanks for improving Sentry Codemod. This repo hosts official codemods for Sentry, built in collaboration with Codemod.

## Prerequisites

- Node.js 20+
- pnpm, npm, or yarn

## Development

- To scaffold a new codemod:

```bash
npx codemod@latest init
```

- To publish the codemod to [Codemod Registry](app.https://app.codemod.com/registry) (run in the codemod's directory):

```bash
npx codemod@latest publish
```

## Directory Layout

- `codemods/` contains versioned placeholders and, optionally, a `migration-recipe/` folder when orchestration is provided.

## Checks

- Formatting/Linting: `npm run check` (Biome)
- Types: `npm run typecheck`

## Pull Requests

- Describe the proposed codemod or recipe and intended migration scenario
- Keep this repo free of engine-specific transform code
- If proposing a recipe, document each included codemod and the order

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
