<template>
  <div
    v-if="slots.media"
    :class="$style.media"
  >
    <slot name="media" />
  </div>
  <slot name="info"></slot>
  <div :class="[$style.wrapper, !slots.media && $style.indents]">
    <h2
      v-html="title"
      :class="$style.title"
    />

    <Caption
      v-if="slots.text"
      :class="$style.caption"
      ><slot name="text"
    /></Caption>
    <slot
      v-if="slots.body"
      name="body"
    />
  </div>
</template>

<script lang="ts" setup>
import Caption from "~/components/Balance/Caption.vue";

const slots = useSlots();

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {},
);
</script>

<style lang="scss" module>
.title {
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
  margin-top: 0;
  padding-top: 12px;
  margin-bottom: 16px;
}

.wrapper {
  max-width: 320px;
  margin: 0 auto;
}

.indents {
  margin-top: 46px;
}
.caption {
  text-align: center;
}

.media {
  clip-path: ellipse(155% 100% at 50% 0%);
  height: 300px;
  overflow: hidden;
  margin-bottom: 12px;

  video {
    -o-object-fit: cover;
    object-fit: cover;
    width: 100%;
    height: 115%;
    top: 0;
    left: 0;
    z-index: 0;
  }

  img {
    width: 100%;
  }
}
</style>
