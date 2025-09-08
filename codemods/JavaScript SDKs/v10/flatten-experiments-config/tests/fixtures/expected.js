// Test case 1: Basic _experiments with enableLogs and beforeSendLog
Sentry.init({
  dsn: "https://example@sentry.io/123",
  environment: "production",
  enableLogs: true,
  beforeSendLog: (log) => {
    return log;
  },
});

// Test case 2: _experiments with additional properties
Sentry.init({
  dsn: "https://example@sentry.io/123",
  environment: "production",
  enableLogs: false,
  beforeSendLog: (log) => log,
  customExperiment: "test",
});

// Test case 3: Multiple Sentry.init calls with _experiments
Sentry.init({
  dsn: "https://example@sentry.io/123",
  enableLogs: true,
});

// Test case 4: No _experiments (should remain unchanged)
Sentry.init({
  dsn: "https://example@sentry.io/123",
  environment: "production",
});

// Test case 5: Complex _experiments with nested objects
Sentry.init({
  dsn: "https://example@sentry.io/123",
  environment: "production",
  enableLogs: true,
  beforeSendLog: (log) => {
    if (log.level === 'error') {
      return { 
        ...log,
        extra: { processed: true }
      };
    }
    return log;
  },
  customConfig: {
    debug: true,
    verbose: false,
  },
});

// Test case 6: _experiments as only property
Sentry.init({
  enableLogs: true,
  debugMode: false,
});