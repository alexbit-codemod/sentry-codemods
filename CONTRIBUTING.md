# Contributing

Thanks for improving Sentry Codemod. This repo hosts official codemods for Sentry, built in collaboration with Codemod.

## Prerequisites

- Node.js 20+
- pnpm, npm, or yarn

## Development

- Install deps: your package manager will be used only for tooling (TypeScript, Biome).
- Add a new recipe by copying `codemods/_template`.
- Keep transforms idempotent and conservative by default.

## Checks

- Formatting/Linting: `npm run check` (Biome)
- Types: `npm run typecheck`

## Pull Requests

- Describe the motivation and migration scenario
- Include minimal fixtures (`fixtures/`) and, if applicable, a simple test script in `tests/`
- Document options and safety in `meta.json`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
