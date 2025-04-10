<template>
  <div
    ref="menu"
    :class="[$style.menu, !userStore.userIsAuthorized && $style['mobile-fix']]"
    @click.self="coreStore.hideMenuHeader"
  >
    <div :class="$style['inner-container']">
      <CloseButton />
      <UserData v-if="userStore.userIsAuthorized" />
      <Controls />
    </div>
    <div :class="$style.shadow"></div>
  </div>
</template>

<script setup lang="ts">
import CloseButton from "./Menu/CloseButton.vue";
import UserData from "./Menu/UserData.vue";
import Controls from "./Menu/Controls.vue";

let timer: undefined | ReturnType<typeof setTimeout> = undefined;
const userStore = useUserStore();
const coreStore = useCoreStore();
const menu = ref<null | HTMLElement>(null);

const handleDocumentClick = (e: MouseEvent) => {
  const target = e.target as Node | null;
  if (target && !menu.value?.contains(target)) {
    coreStore.hideLanguageSubmenu();
    coreStore.hideMenuHeader();
  }
};

onMounted(() => {
  timer = setTimeout(
    () => document.addEventListener("click", handleDocumentClick),
    10,
  );
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<style lang="scss" module>
.menu {
  position: absolute;
  right: 56px;
  top: calc(100% + 5px);
  color: $white-2;
  transition: all 0.1s linear;
  border-radius: 20px;

  height: calc(100dvh - 72px) !important;
  z-index: 200;

  @media screen and (max-width: 1300px) {
    position: fixed;
    right: auto;
    left: 0;
    top: 0;
    width: 100%;
    height: 100dvh;
  }
}

.mobile-fix {
  @media screen and (min-width: 1301px) {
    display: none;
  }
}

.inner-container {
  display: flex;
  flex-direction: column;
  width: 311px;
  border-radius: $br15;
  background: var(--general-transparent-dark-75);
  backdrop-filter: blur(40px);
  box-shadow: 2px 4px 10px 0 rgba(20, 22, 26, 0.3);
  padding-bottom: 20px;

  @media screen and (max-width: 1300px) {
    overflow: auto;
    position: absolute;
    top: 12px;
    left: 8px;
    right: 8px;
    bottom: 0;
    z-index: 1000;
    width: auto;
    height: unset;
    border-radius: 16px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    backdrop-filter: unset;
    background: var(--general-new-fill-2);
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}

.shadow {
  display: none;
  pointer-events: none;
  @media screen and (max-width: 1300px) {
    display: block;
    position: fixed;
    width: calc(100% - 16px);
    height: 50px;
    bottom: 72px;
    left: 8px;
    border-radius: 0 0 16px 16px;
    background: linear-gradient(0deg, #1a1b1f 0%, rgba(29, 30, 35, 0) 100%);
    z-index: 1000;
  }
}

.hidden-on-pc {
  @media screen and (min-width: 1301px) {
    display: none;
  }
}
</style>
