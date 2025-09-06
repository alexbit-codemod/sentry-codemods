Sentry.init({
  enableLogs: true,
  beforeSendLog: (log) => {
    return log;
  },
});