export const onLocaleChange = (cb: Function) => {
  const { locale } = useI18n();
  watch(
    () => locale.value,
    async () => {
      cb.constructor.name === "AsyncFunction" ? await cb() : cb();
    },
  );
};
