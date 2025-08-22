import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { transform as jscodeshiftRunner } from 'jscodeshift/src/testUtils';

const ROOT = join(process.cwd(), 'recipes', 'v8');

function findPairs(dir: string) {
  const files = readdirSync(dir);
  const inputs = files.filter((f) => f.endsWith('.input.ts'));
  return inputs.map((input) => ({
    input: join(dir, input),
    output: join(dir, input.replace('.input.ts', '.output.ts')),
  }));
}

function normalize(text: string) {
  return text.replace(/\r\n/g, '\n').trim();
}

async function run() {
  const recipeDirs = readdirSync(ROOT).filter((d) => d !== 'migration-recipe');
  let failures = 0;

  for (const recipe of recipeDirs) {
    const recipePath = join(ROOT, recipe);
    const fixturesDir = join(recipePath, 'fixtures');
    let pairs: { input: string; output: string }[] = [];
    try {
      pairs = findPairs(fixturesDir);
    } catch {
      continue; // no fixtures
    }

    const transformPath = join(recipePath, 'transform.ts');
    const mod = await import(transformPath);
    const transform = (mod.default ?? mod) as unknown as (
      file: { path: string; source: string },
      api: any,
      options?: any,
    ) => string | undefined;

    for (const pair of pairs) {
      const source = readFileSync(pair.input, 'utf8');
      const expected = readFileSync(pair.output, 'utf8');

      const result = jscodeshiftRunner(transform as any, { path: pair.input, source }, {});
      const actual = typeof result === 'string' ? result : source;

      if (normalize(actual) !== normalize(expected)) {
        failures++;
        console.error(`Mismatch: ${basename(pair.input)} in ${recipe}`);
      } else {
        console.log(`OK: ${basename(pair.input)} in ${recipe}`);
      }
    }
  }

  if (failures > 0) {
    console.error(`\n${failures} fixture(s) failed`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
