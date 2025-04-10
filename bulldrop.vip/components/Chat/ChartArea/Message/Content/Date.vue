<template>
  <div :class="$style.date">{{ formattedCreatedAt }}</div>
</template>

<script setup lang="ts">
import type { Message } from "~/types";

const props = defineProps<{
  createdAt: Message["created_at"];
}>();
const { createdAt } = toRefs(props);
const formattedCreatedAt = computed<string>(() => {
  const options = {
    hour: "numeric",
    minute: "numeric",
  } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat("ru", options).format(
    new Date(createdAt.value),
  );
});
</script>

<style lang="scss" module>
.date {
  line-height: 1rem;
  font-size: 0.75rem;
  color: var(--general-dark-grey);
}
</style>
