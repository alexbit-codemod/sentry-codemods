# Flatten Experiments Config Codemod

A codemod that flattens `_experiments` configuration objects by extracting `enableLogs` and `beforeSendLog` properties from within the `_experiments` object and moving them to the parent level.

## Overview

This codemod transforms Sentry configuration objects that have logging-related properties wrapped in an `_experiments` object. It extracts these properties and moves them to the top level of the configuration, removing the `_experiments` wrapper.

## What it does

The codemod specifically targets configuration objects containing:
- `_experiments.enableLogs` → becomes `enableLogs`
- `_experiments.beforeSendLog` → becomes `beforeSendLog`

## Examples

### Basic Example

**Before:**
```typescript
Sentry.init({
  _experiments: {
    enableLogs: true,
    beforeSendLog: (log) => {
      return log;
    },
  },
});
```

**After:**
```typescript
Sentry.init({
  enableLogs: true,
  beforeSendLog: (log) => {
    return log;
  },
});
```

### With Other Properties

**Before:**
```typescript
Sentry.init({
    dsn: "https://example.com",
    _experiments: {
        enableLogs: false,
        beforeSendLog: (log) => {
            console.log("Processing log:", log);
            return log;
        },
    },
    environment: "production",
});
```

**After:**
```typescript
Sentry.init({
    dsn: "https://example.com",
    enableLogs: false,
    beforeSendLog: (log) => {
        console.log("Processing log:", log);
        return log;
    },
    environment: "production",
});
```

### Arrow Function Example

**Before:**
```typescript
Sentry.init({
    _experiments: {
        enableLogs: true,
        beforeSendLog: log => log.level === "error" ? log : null,
    },
});
```

**After:**
```typescript
Sentry.init({
    enableLogs: true,
    beforeSendLog: log => log.level === "error" ? log : null,
});
```

## Usage

### Running the Codemod

This codemod uses the Codemod workflow engine. To run it:

```bash
codemod run flatten-experiments-config
```

### Supported Files

The codemod processes the following TypeScript file types:
- `*.ts`
- `*.js`
- `*.jsx`
- `*.tsx`
- `*.cts`
- `*.mts`

It automatically excludes `node_modules` directories.

