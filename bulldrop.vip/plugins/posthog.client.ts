import posthog from "posthog-js";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const { apiKey, apiHost } = runtimeConfig.public.posthog;
  const clientPosthog = posthog.init(apiKey, {
    api_host: apiHost,
    autocapture: false,
  });
  return {
    provide: {
      clientPosthog,
    },
  };
});
