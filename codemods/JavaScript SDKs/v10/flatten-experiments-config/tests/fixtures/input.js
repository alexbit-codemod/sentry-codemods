Sentry.init({
  _experiments: {
    enableLogs: true,
    beforeSendLog: (log) => {
      return log;
    },
  },
});
