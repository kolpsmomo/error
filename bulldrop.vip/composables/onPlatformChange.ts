export const onPlatformChange = (cb: Function) => {
  const platform = computed(() => usePlatform());
  watch(
    () => platform.value,
    async () => {
      cb.constructor.name === "AsyncFunction" ? await cb() : cb();
    },
  );
};
