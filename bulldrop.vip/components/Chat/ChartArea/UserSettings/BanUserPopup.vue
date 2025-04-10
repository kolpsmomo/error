<template>
  <div
    :class="$style['popup-wrapper']"
    @click.stop
  >
    <div :class="$style.popup">
      <slot name="title"></slot>
      <div :class="$style.controllers">
        <div
          :class="$style.cancel"
          @click="emits('hide')"
        >
          {{ t("popup.cancel") }}
        </div>
        <div
          :class="$style.ok"
          @click="emits('ok')"
        >
          {{ t("popup.ok") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const emits = defineEmits<{
  (e: "hide"): void;
  (e: "ok"): void;
}>();
</script>

<style lang="scss" module>
.popup-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -10%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  backdrop-filter: blur(1px);
}
.popup {
  position: absolute;
  width: calc(100% - 48px);
  display: flex;
  padding: 32px 12px 12px 12px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 14px;
  background: var(--general-underlay-1-lvl, #232429);

  .title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: -0.14px;
  }

  .controllers {
    display: flex;
    gap: 0.5rem;
    width: 100%;

    .cancel {
      background: var(--button-ghost-default, rgba(125, 128, 145, 0));
      color: var(--general-grey, #7d8091);

      &:hover {
        background: var(--button-ghost-hover);
      }

      &:active {
        background: var(--button-ghost-active);
      }
    }

    .ok {
      background: var(--button-tonal-default, #33353b);
      color: var(--general-white, #f5f5fa);

      &:hover {
        background: var(--button-tonal-hover);
      }

      &:active {
        background: var(--button-tonal-active);
      }
    }

    div {
      cursor: pointer;
      display: flex;
      padding: 12px 16px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      border-radius: 12px;
    }
  }
}
</style>
