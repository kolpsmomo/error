<template>
  <Container :stop-height="footerHeight">
    <GameLinks />
  </Container>
</template>

<script setup lang="ts">
import Container from "./SidePanel/Container.vue";
import GameLinks from "./SidePanel/GameLinks.vue";
import { useFooterHeight } from "./SidePanel/composables/useFooterHeight";

const props = defineProps<{
  footerRef: HTMLElement | null;
}>();
const footerRef = toRef(() => props.footerRef);
const footerHeight = useFooterHeight(footerRef);
</script>
