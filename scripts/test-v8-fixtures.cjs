const { execSync } = require('node:child_process');
const { readdirSync, readFileSync } = require('node:fs');
const { join, basename } = require('node:path');

const ROOT = join(process.cwd(), 'codemods', 'v8');
const TMP_ROOT = join(process.cwd(), '.tmp-codemods', 'sentry', 'v8');

function findPairs(dir) {
  const files = readdirSync(dir);
  const inputs = files.filter((f) => f.endsWith('.input.ts'));
  return inputs.map((input) => ({
    input: join(dir, input),
    output: join(dir, input.replace('.input.ts', '.output.ts')),
  }));
}

function stripLogs(text) {
  return text
    .split('\n')
    .filter((line) => !/^(Processing |Spawning |Running in dry|Sending |All done\.|Results:|\d+ (errors|unmodified|skipped|ok)|Time elapsed:)/.test(line))
    .join('\n')
    .trim();
}

function run() {
  const recipeDirs = readdirSync(ROOT).filter((d) => d !== 'migration-recipe');
  let failures = 0;

  for (const recipe of recipeDirs) {
    const compiled = join(TMP_ROOT, recipe, 'cdmd_dist', 'index.cjs');
    const fixturesDir = join(ROOT, recipe, 'fixtures');
    let pairs = [];
    try {
      pairs = findPairs(fixturesDir);
    } catch {
      continue;
    }

    for (const pair of pairs) {
      try {
        const cmd = `npx -y jscodeshift -t "${compiled}" --parser ts --extensions ts --print --dry "${pair.input}"`;
        const raw = execSync(cmd, { stdio: 'pipe' }).toString();
        const actual = stripLogs(raw);
        const expected = readFileSync(pair.output, 'utf8').trim();
        if (actual !== expected) {
          failures++;
          process.stderr.write(`Mismatch: ${basename(pair.input)} in ${recipe}\n`);
        } else {
          process.stdout.write(`OK: ${basename(pair.input)} in ${recipe}\n`);
        }
      } catch (e) {
        failures++;
        process.stderr.write(`Error running jscodeshift for ${basename(pair.input)} in ${recipe}\n`);
      }
    }
  }

  if (failures > 0) {
    process.stderr.write(`\n${failures} fixture(s) failed\n`);
    process.exit(1);
  }
}

run();
