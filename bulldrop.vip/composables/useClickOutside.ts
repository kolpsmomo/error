export function useClickOutside(
  targetRef: Ref<Element | null>,
  cb: (event: Event) => void,
) {
  const handleClick = (event: Event) => {
    if (
      targetRef.value &&
      (event.target === targetRef.value ||
        event.composedPath().includes(targetRef.value))
    ) {
      return;
    }
    cb(event);
  };

  watch(
    targetRef,
    () => {
      if (targetRef.value) {
        document.addEventListener("click", handleClick);
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
}
