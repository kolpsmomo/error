export const onUserLogin = (cb: Function) => {
  const userStore = useUserStore();
  watch(
    () => userStore.userIsAuthorized,
    async (logedIn) => {
      if (logedIn) {
        cb.constructor.name === "AsyncFunction" ? await cb() : cb();
      }
    },
  );
};
