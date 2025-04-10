<template>
  <div
    :class="$style['social-links-container']"
    data-test="social-links-container"
  >
    <ClientOnly>
      <a
        v-if="!coreStore.isUserIndia"
        :href="vk"
        target="__blank"
        :class="$style['social-link']"
      >
        <IconVk />
      </a>
      <a
        v-if="!coreStore.isUserIndia"
        :href="platform.tg"
        target="__blank"
        :class="$style['social-link']"
      >
        <IconTelegram />
      </a>
      <a
        v-else-if="coreStore.isUserIndia"
        :href="platform.ALL_PLATFORMS_DATA.bgmi.insta"
        target="__blank"
        :class="$style['social-link']"
      >
        <IconInstagram />
      </a>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const { vk } = useCoreStore();
const platform = computed(() => usePlatform());
const coreStore = useCoreStore();
</script>

<style lang="scss" module>
.social-links-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  gap: 16px;
}

.social-link {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: $br10;
  background-color: transparent;
  transition: 0.25s;

  &:hover {
    background-color: var(--button-ghost-hover);
  }

  svg {
    width: 20px;
    fill: var(--bdrop-footer-nav-color);
  }
}
</style>
