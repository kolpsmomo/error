import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const {
    public: { sentry },
  } = useRuntimeConfig();

  if (!sentry.dsn) {
    return;
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 0.001,
    attachStacktrace: true,
    replaysSessionSampleRate: 0.001,
    replaysOnErrorSampleRate: 0.001,
  });

  nuxtApp.vueApp.config.errorHandler = (error) => {
    Sentry.captureException(error);
  };
});
