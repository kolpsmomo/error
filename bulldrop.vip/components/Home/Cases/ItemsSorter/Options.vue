<template>
  <div
    :class="[
      $style['sorter-options'],
      mobileLeft && $style['sorter-options--left'],
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * По умолчанию блок с опциями будет распологаться по правому краю вмещающего
 * контейнера. Данная опция указывает разместить этот блок по левому краю
 * на мобильных устройствах.
 */
defineProps<{
  mobileLeft?: boolean;
}>();

const emit = defineEmits<{
  "hide-options": [];
}>();

/**
 * Обрабатывает клик по документу.
 *
 * @param {Event} e - объект события клика.
 */
const processDocumentClick = (e: MouseEvent) => {
  try {
    if (
      !e.target ||
      (!(e.target as HTMLElement).closest(".sorter-options") &&
        !(e.target as HTMLElement).closest(".sorter-button"))
    ) {
      emit("hide-options");
    }
  } catch (e) {
    //
  }
};

onMounted(() => {
  document.addEventListener("click", processDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", processDocumentClick);
});
</script>

<style lang="scss" module>
.sorter-options {
  position: absolute;
  top: 64px;
  width: 100%;
  z-index: 2;
  left: 0;
  padding: 8px;
  overflow: hidden;
  filter: var(--bdrop-filter-shadow);
  border-radius: 22px;
  background: var(--general-underlay-3-lvl);
  gap: 2px;
  display: flex;
  flex-direction: column;

  &--left {
    @media screen and (max-width: $mobile-case-filter) {
      left: 0;
      top: 44px;
      right: auto;
      width: auto;
      border-radius: 12px;
    }
  }
}
</style>
