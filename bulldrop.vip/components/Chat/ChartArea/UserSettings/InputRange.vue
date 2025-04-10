<template>
  <div
    :class="[$style['range-wrapper'], disabled && $style['range-disabled']]"
    data-test="chat_range_wrapper"
  >
    <div :class="$style['range-title']">
      <div
        v-for="(step, i) in steps"
        :key="step"
        data-test="chat_step_set_value"
        :class="[
          i === steps.length - 1 ? $style['justify-end'] : '',
          $style.step,
        ]"
        @click="setValue(i)"
      >
        {{ step }}
      </div>
    </div>
    <div :class="$style.range">
      <input
        v-model="curValue"
        ref="sliderEl"
        type="range"
        :min="min"
        :max="steps.length - 1"
        :step="step"
        :disabled="disabled"
      />
      <div :class="$style.sliderticks">
        <template
          v-for="i in steps.length"
          :key="i"
        >
          <span
            :class="[
              i <= curValue && i !== steps.length
                ? $style.active
                : $style.inactive,
            ]"
          >
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  steps: string[];
  rangeValue: number;
  disabled?: boolean;
};

const props = defineProps<Props>();
const { steps, rangeValue, disabled } = toRefs(props);
const emits = defineEmits<{
  (e: "set-range-value", data: number): void;
}>();
const curValue = ref<number>(rangeValue.value);
const sliderEl = ref<HTMLInputElement | null>(null);
const min = 0;
const max = steps.value.length;
const step = (max - min) / steps.value.length;
const stepLen = steps.value.length;

onMounted(() => {
  setProgressBar();
});

const setProgressBar = () => {
  const progress =
    (curValue.value / +(sliderEl.value as HTMLInputElement).max) * 100;
  (sliderEl.value as HTMLInputElement).style.background =
    `linear-gradient(to right, var(--general-white) ${progress}%, var(--button-outlined-stroke-default) ${progress}%)`;
};

const setValue = (i: number) => {
  if (!disabled.value) {
    curValue.value = i;
  }
};

watch(
  () => curValue.value,
  () => {
    setProgressBar();
    emits("set-range-value", curValue.value);
  },
);

watch(
  () => rangeValue.value,
  () => {
    curValue.value = rangeValue.value;
    setProgressBar();
  },
);
</script>

<style lang="scss" module>
.range-wrapper {
  position: relative;
  padding: 20px 20px 14px 14px;
  border-radius: 0.75rem;
  background: var(--general-underlay-2-lvl);

  &:not(.range-disabled) {
    $general-white: rgb(245, 245, 250);

    input[type="range"]::-webkit-slider-thumb:hover {
      box-shadow: 0 0 0 2px rgba($general-white, 0.05);
    }

    input[type="range"]:active::-webkit-slider-thumb {
      box-shadow: 0 0 0 4px rgba($general-white, 0.05);
    }

    /* Hover, active & focus Thumb: Firfox */

    input[type="range"]::-moz-range-thumb:hover {
      box-shadow: 0 0 0 2px rgba($general-white, 0.05);
    }

    input[type="range"]:active::-moz-range-thumb {
      box-shadow: 0 0 0 4px rgba($general-white, 0.05);
    }
  }

  input {
    $line-height: 2px;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
    border-radius: 15px;
    height: $line-height;
    background: var(--general-white);
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 1.5rem;
    width: 1.5rem;
    background: var(--general-white);
    border-radius: 50%;
    border: none;
    z-index: 1;
    cursor: pointer;
    filter: drop-shadow(0px 0px 6px rgba(20, 22, 26, 0.25));
  }

  /* Thumb: Firefox */
  input[type="range"]::-moz-range-thumb {
    background: var(--general-white);
    border-radius: 50%;
    border: none;
    filter: drop-shadow(0px 0px 6px rgba(20, 22, 26, 0.25));
  }
}

.range {
  width: 100%;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 0.25rem;
}

.sliderticks {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -11.5px;
}

.sliderticks span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.sliderticks span::before {
  content: "";
  border-radius: 50%;
  width: 5px;
  height: 5px;
  background: var(--general-white);
}

.inactive {
  background: var(--button-outlined-stroke-default);
  z-index: -1;

  &::before {
    background: var(--bdrop-chat-area) !important;
  }
}

.inactive ~ .inactive {
  z-index: 1;
}

.active {
  background: var(--bdrop-chat-area);

  &::before {
    background: var(--general-white);
  }
}

.justify-end {
  justify-self: end;
  position: relative;
  left: 16px;
}

.range-title {
  display: grid;
  position: absolute;
  width: 100%;
  padding-right: 3rem;
  top: 10px;
  justify-content: space-between;
  grid-template-columns: repeat(v-bind(stepLen), 0.5ch);
  cursor: pointer;

  .step {
    font-size: 14px;
    line-height: 1rem;
    height: 40px;
    color: var(--general-grey);
  }

  @media screen and (max-width: 475px) {
    .step {
      font-size: 0.75rem;
      line-height: 1rem;
    }
  }
}

.range-disabled {
  background: #242528;

  & * {
    cursor: default !important;
  }

  .step {
    color: #4c4e52;
  }

  .inactive,
  .active,
  .sliderticks span::before,
  .sliderticks span {
    background: #4c4e52;
  }

  input {
    background: #4c4e52 !important;
  }

  input[type="range"]::-webkit-slider-thumb {
    background: #4c4e52 !important;
  }
  input[type="range"]::-moz-range-thumb {
    background: #4c4e52 !important;
  }
}
</style>
