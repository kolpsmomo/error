<template>
  <span :class="['fi', `fi-${iconLocale}`]" />
</template>

<script setup lang="ts">
import "/node_modules/flag-icons/css/flag-icons.min.css";

const { locale } = useI18n();

const iconLocale = computed(() => {
  if (locale.value === "en") {
    return "us";
  }

  return locale.value;
});
</script>

<style scoped lang="scss"></style>
