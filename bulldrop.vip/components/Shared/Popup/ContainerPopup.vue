<template>
  <Transition name="popup">
    <Container
      v-if="modelValue"
      data-test="popup-container"
      @click="closeFromOverlay"
    >
      <div
        tabindex="0"
        :class="[$style.popup, isMobile && $style.mobile]"
      >
        <button
          :class="[$style.close, inverted && $style.inverted]"
          tabindex="0"
          :data-test="
            $attrs['data-test'] && $attrs['data-test'] + '-modal-close-button'
          "
          @click="close"
        >
          <IconClosePopup :class="$style.icon" />
        </button>
        <slot />
      </div>
    </Container>
  </Transition>
</template>

<script lang="ts" setup>
import Container from "~/components/Form/Container.vue";

withDefaults(
  defineProps<{
    title?: string;
    modelValue: boolean;
    inverted?: boolean;
  }>(),
  {
    inverted: false,
  },
);

let isMobile = false;
if (isClient()) {
  isMobile = useMobileCheck();
}

const emits = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emits("update:modelValue", false);
};

const closeFromOverlay = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.getAttribute("data-test") === "popup-container") {
    close();
  }
};
</script>

<style lang="scss" module>
.popup {
  border-radius: 24px;
  background: var(--general-underlay-3-lvl);
  width: 100%;
  min-height: 100px;
  position: relative;
  max-width: 475px;
  overflow: hidden;
  padding-bottom: 32px;
}

.mobile {
  position: absolute;
  bottom: 0;
  border-radius: 24px 24px 0 0;
}
.close {
  border-radius: 20px;
  background: rgba(245, 245, 250, 0.1);
  backdrop-filter: blur(5px);
  @include square(32px);
  position: absolute;
  top: 16px;
  right: 16px;
  border: 0;
  z-index: 100;
}

.icon {
  fill: var(--general-white);
  @include square(14px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title {
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 8px;
}

.wrapper {
  padding: 0 16px 32px 0;
  max-width: 320px;
  margin: 0 auto;
}

.inverted {
  background: rgba(245, 245, 250, 0.7);

  svg {
    fill: var(--general-background);
  }
}

.footer {
  margin-top: 26px;
}
</style>
