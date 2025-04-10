import type { Ref } from "vue";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

/**
 * Считает высоту футера, для того, чтобы можно было определить,
 * на какой высоте остановить сайд панель
 *
 * @param footerRef - реф футера;
 * @returns {Object} - высота футера
 */
export const useFooterHeight = (footerRef: Ref) => {
  const height = ref(0);

  const calculateHeight = () => {
    if (!footerRef.value) {
      height.value = 0;
      return;
    }
    const footerElement = footerRef.value.$el;
    height.value = footerElement.offsetHeight;
  };

  const handleResize = () => {
    if (window.innerWidth <= 1100) {
      height.value = 0;
      return;
    }
    calculateHeight();
  };
  watch(footerRef, () => {
    calculateHeight();
  });
  onMounted(() => {
    window.addEventListener("resize", handleResize);
    nextTick(calculateHeight);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return height;
};
