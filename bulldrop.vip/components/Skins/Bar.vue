<template>
  <div :class="$style['bar-wrapper']">
    <div
      :class="[
        $style.bar,
        $style[`${qualityClass}-bar`],
        size === 'table' && $style['table-bar'],
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import type { Size } from "./types";

type Props = {
  qualityClass: string;
  size?: Size;
};

const props = withDefaults(defineProps<Props>(), {
  size: "regular",
});

const { qualityClass, size } = toRefs(props);
</script>
<style lang="scss" module>
.bar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.bar {
  width: 50%;
  height: 4px;
  border-radius: 0 0 12px 12px;
}

.table-bar {
  height: 2px;
}

@mixin barColor($color) {
  background: $color;
  box-shadow: 0 0 20px 0 $color;
}
.red-bar {
  @include barColor(var(--bdrop-red-prize));
}

.pink-bar {
  @include barColor(var(--bdrop-pink-prize));
}

.violet-bar {
  @include barColor(var(--bdrop-violet-prize));
}

.blue-bar {
  @include barColor(var(--bdrop-blue-prize));
}

.light-blue-bar {
  @include barColor(var(--bdrop-light-blue-prize));
}

.gold-bar {
  @include barColor(var(--bdrop-gold-prize));
}

.green-bar {
  @include barColor(var(--bdrop-green-prize));
}

.grey-bar {
  @include barColor(var(--bdrop-grey-prize));
}
</style>
