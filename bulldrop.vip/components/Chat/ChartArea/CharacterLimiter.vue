<template>
  <div
    ref="limiterRef"
    :class="[
      $style.limiter,
      limiterClassName && $style[limiterClassName],
      isKeyFiredLocal && $style.animate,
    ]"
  >
    <div :class="$style.svgWrapper">
      <svg viewBox="0 0 140 140">
        <circle
          cx="67"
          cy="59"
          r="65"
        />
        <circle
          cx="67"
          cy="59"
          r="65"
        />
      </svg>
    </div>
    <div
      data-test-id="limiter-text"
      :class="$style.text"
    >
      {{ characterCounter }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  messageLength: {
    type: Number,
    default: 0,
  },
  isKeyFired: Boolean,
});
const { isKeyFired, messageLength } = toRefs(props);
const limiterRef = ref<HTMLDivElement>();
const limiterRef_handler = () => {
  isKeyFiredLocal.value = false;
};

onMounted(() => {
  if (limiterRef.value)
    limiterRef.value.addEventListener("animationend", limiterRef_handler);
});

onBeforeUnmount(() => {
  if (limiterRef.value)
    limiterRef.value.removeEventListener("animationend", limiterRef_handler);
});

const isKeyFiredLocal = ref(false);

watch(isKeyFired, (value) => {
  if (value) isKeyFiredLocal.value = true;
});

const emits = defineEmits(["isLimitChanged"]);

const limit = ref({
  amount: 200,
  warning: 20,
});

const isLimit = computed(() => {
  return messageLength.value >= limit.value.amount;
});

const isWarning = computed(() => {
  return limit.value.amount - messageLength.value <= limit.value.warning;
});

const limitAfterWarning = computed(() => {
  return limit.value.amount - messageLength.value;
});

const characterCounter = computed(() => {
  if (limitAfterWarning.value < 0) {
    return limitAfterWarning.value;
  }

  return isLimit.value ? 0 : isWarning.value ? limitAfterWarning.value : "";
});

const isTyping = computed(() => {
  return messageLength.value > 0;
});

const limiterClassName = computed(() => {
  if (isLimit.value) return "limit";
  if (isWarning.value) return "warning";
  if (isTyping.value) return "typing";
  return "";
});

const filledPercent = computed(() => {
  return Math.round((messageLength.value / limit.value.amount) * 100);
});

const isLimitChanged = () => {
  emits("isLimitChanged", isLimit.value);
};

watch(
  () => isLimit.value,
  () => {
    isLimitChanged();
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" module>
.limiter {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;

  svg {
    width: 24px;
    height: 24px;
    transform: rotate(-85deg);

    circle {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: var(--general-stroke);
      stroke-width: 10;
      stroke-linecap: round;
      transform: translate(3px, 11px);

      &:nth-child(2) {
        stroke-dashoffset: calc(405px - (405px * v-bind(filledPercent)) / 100);
        stroke-dasharray: 405;
      }
    }
  }
}

.typing {
  circle {
    &:nth-child(2) {
      stroke: #4282ff;
    }
  }
}

.warning {
  circle {
    &:nth-child(2) {
      stroke: #ffd43d;
    }
  }

  color: #3e404a;
}

.limit {
  circle {
    &:nth-child(2) {
      stroke: #e84646;
    }
  }

  color: #e84646;
}

.animate {
  animation: limit 0.2s cubic-bezier(0.22, -0.01, 0, 1.27);
}

@keyframes limit {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.text {
  font-size: 10px;
  line-height: 1px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.svgWrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}
</style>
