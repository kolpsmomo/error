<template>
  <div
    :class="[
      $style['input-wrapper'],
      disabled && $style['disabled'],
      focused && $style['focused'],
      modelValue && $style['completed'],
      hasError && $style['error'],
      wrapperClass && wrapperClass,
    ]"
  >
    <div
      v-if="hasLeftIconSlot"
      :class="[$style['input-icon-wrapper'], $style['left']]"
    >
      <slot name="icon-left" />
    </div>
    <input
      ref="el"
      :class="[
        $style['input'],
        hasIconSlot && $style['with-right-icon'],
        hasLeftIconSlot && $style['with-left-icon'],
      ]"
      v-bind="$attrs"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div
      v-if="hasIconSlot"
      :class="[$style['input-icon-wrapper'], $style['right']]"
    >
      <slot name="icon" />
    </div>
    <span
      v-if="postfix && modelValue"
      ref="postfix"
      :class="$style['postfix']"
    >
      {{ postfix }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useIMask } from "vue-imask";
import type { FactoryOpts } from "imask";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  // label input'а.
  label?: string;
  // Модель input'а.
  modelValue?: string | number;
  // Значение input'а.
  value?: string | number;
  // Placeholder, который визуально будет смещаться вверх при фокусе или заполнении input'а.
  customPlaceholder?: string;
  // Содержание ошибки для указанного поля.
  hasError?: boolean;
  // Постфикс
  postfix?: string;
  // Обновлять после ввода.
  lazy?: boolean;
  // Индикатор неактивности поля.
  disabled?: boolean;
  // класс враппера
  wrapperClass?: string;
  // опции маски
  maskOptions?: FactoryOpts;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  modelValue: "",
  value: "",
  customPlaceholder: "",
  hasError: false,
  postfix: "",
  wrapperClass: "",
  lazy: false,
  disabled: false,
  maskOptions: () => ({
    mask: /.*/,
  }),
});

const { modelValue, hasError, postfix, disabled, maskOptions } = toRefs(props);

const { el, masked, unmasked } = useIMask(maskOptions, {
  onAccept,
  onComplete,
});

masked.value = modelValue.value?.toString();

watch(modelValue, (v) => (masked.value = v.toString()));

// Индикатор того, что input находится в фокусе.
const focused = ref<boolean>(false);
// Нужен для расчет длинны текста
const context = ref<CanvasRenderingContext2D | null>(null);
// Смещение постфикса в px
// const postfixOffset = ref<number>(0);

const slots = useSlots();

const hasIconSlot = computed(() => {
  return !!slots.icon;
});

const hasLeftIconSlot = computed(() => {
  return !!slots["icon-left"];
});

const emits = defineEmits<{
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "update:modelValue", data: string | null | undefined): void;
  (e: "complete", data: boolean): void;
  (e: "unmasked", data: boolean): void;
  (e: "set-unmasked", data: string): void;
}>();

onMounted(() => {
  if (postfix.value && el.value) {
    const inputFont = window
      .getComputedStyle(el.value as HTMLElement)
      .getPropertyValue("font");
    const canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.font = inputFont;
    context.value = ctx;
  }
});

// const get_postfixOffset = () => {
//     const metrics = (context.value as CanvasRenderingContext2D).measureText(
//         el?.value?.value as string
//     );
//     return metrics.width + 20;
// };

// Обрабатывает фокус на компоненте.
const handleFocus = () => {
  focused.value = true;
  emits("focus");
};

// Обрабатывает потерю фокуса с компонента.
const handleBlur = () => {
  focused.value = false;
  emits("blur");
};

function onAccept(e?: InputEvent) {
  emits("complete", false);
  if (!e) return;
  emits("update:modelValue", (e.target as HTMLInputElement).value);
}

function onComplete(e?: InputEvent) {
  if (!e) {
    emits("complete", false);
    return;
  }
  emits("set-unmasked", unmasked.value);
  emits("complete", true);
}
</script>

<style lang="scss" module>
.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid transparent;
  .postfix {
    z-index: 5;
    position: absolute;
    font-size: 16px;
    color: var(--general-white);
  }

  .input-icon-wrapper {
    display: flex;
    align-items: center;
    z-index: 1;
    position: absolute;

    &.left {
      left: 16px;
    }
    &.right {
      right: 16px;
    }

    svg {
      width: 18px;
      height: 18px;
      fill: var(--general-transparent-light-35);
    }
  }
  .input {
    padding: 18px 16px;
    outline: none;
    border: none;
    color: var(--general-white);
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.14px;
    flex: 1 0;
    background: var(--input-default);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type="number"] {
      -moz-appearance: textfield;
    }
    &.with-left-icon {
      padding-left: 40px;
    }
    &.with-right-icon {
      padding-right: 48px;
    }
    &::placeholder {
      color: var(--general-transparent-light-35);
    }
    &:-ms-input-placeholder {
      color: var(--general-transparent-light-35);
      opacity: 1;
    }
  }
  svg {
    fill: var(--general-white);
  }
  &:hover {
    .input {
      &::placeholder {
        color: var(--general-transparent-light-70);
      }
    }
  }

  &:not(.disabled, .error):hover {
    border: 1px solid var(--general-stroke);
  }
  &.completed:not(.readonly) {
    border: 1px solid var(--general-grey);
    //border-color: var(--bdrop-input-border-completed);
  }
  &.completed {
    border: 1px solid var(--general-grey);
    //border-color: var(--bdrop-input-border-completed);
    .postfix {
      color: var(--bdrop-input-border-completed);
    }
    svg {
      //fill: var(--bdrop-checkbox-color);
    }
  }
  //&.focused {
  //    border: 1px solid var(--general-grey);
  //  .postfix {
  //    color: var(--bdrop-input-border-focus);
  //  }
  //  .input:active {
  //      color: var(--general-grey-light);
  //  }
  //  svg {
  //    //fill: var(--general-white);
  //  }
  //}
  &.disabled {
    background: var(--input-disabled);
    .input {
      color: $grey-2;
      cursor: not-allowed;
    }
    border-color: $grey-2;

    svg {
      fill: var(--general-transparent-light-35);
    }
  }
  &.error {
    border-color: $red-1;
    svg {
      fill: var(--general-white);
    }
    &.completed {
      border-color: $red-1;
      .input {
        color: var(--general-white);
      }
      svg {
        fill: var(--general-white);
      }
    }
  }
}
</style>
