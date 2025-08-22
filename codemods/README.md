# Recipes

Each recipe contains a codemod targeting a specific Sentry migration or best practice.

Structure:

```
<recipe-id>/
  meta.json      // name, summary, safety, tags, options
  transform.ts   // ESM entrypoint
  tests/         // optional test harness
  fixtures/      // sample before/after files
```

Create a new recipe by copying `_template` and updating `meta.json` and `transform.ts`.
