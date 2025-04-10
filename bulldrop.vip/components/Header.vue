<template>
  <Container>
    <template #left-side>
      <Pc>
        <BigLogo />
        <PlatformSwitcherButton />
        <DesktopNav />
      </Pc>
      <Mobile>
        <SmallLogo />
        <PlatformSwitcherButton />
      </Mobile>
    </template>
    <template #right-side>
      <template v-if="userStore.userIsResolved">
        <Pc>
          <SetLanguageDesktop />
        </Pc>
        <template v-if="userStore.userIsAuthorized">
          <PcAndTablet>
            <VolumeButton />
          </PcAndTablet>
          <BalanceButton />
          <PcAndTablet>
            <Avatar @click="coreStore.toggleMenuHeader" />
          </PcAndTablet>
          <Pc>
            <BurgerButton @click="coreStore.toggleMenuHeader" />
          </Pc>
        </template>
        <LoginButton v-else />
      </template>
    </template>
    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Menu
        v-if="coreStore.headerMenuIsRequired"
        :class="{ 'hidden-on-pc': !userStore.userIsAuthorized }"
      />
    </Transition>
  </Container>
</template>

<script setup lang="ts">
import animejs from "animejs";
import Container from "./Header/Container.vue";
import Pc from "./Header/Pc.vue";
import PcAndTablet from "./Header/PcAndTablet.vue";
import Mobile from "./Header/Mobile.vue";
import VolumeButton from "./Header/VolumeButton.vue";
import BalanceButton from "./Header/BalanceButton.vue";
import Avatar from "./Header/Avatar.vue";
import BurgerButton from "./Header/BurgerButton.vue";
import BigLogo from "./Header/BigLogo.vue";
import SmallLogo from "./Header/SmallLogo.vue";
import DesktopNav from "./Header/DesktopNav.vue";
import Menu from "./Header/Menu.vue";
import LoginButton from "./Header/LoginButton.vue";
import PlatformSwitcherButton from "./PlatformSwitcher/PlatformSwitcherButton.vue";

const breakpoint: number = 1300;
const userStore = useUserStore();
const coreStore = useCoreStore();
let animationTimer: ReturnType<typeof setTimeout> | undefined = undefined;

onBeforeUnmount(() => {
  clearTimeout(animationTimer);
});

function beforeEnter(el: Element) {
  if (document.documentElement.clientWidth >= breakpoint) {
    (el as HTMLElement).style.opacity = "0";
    (el as HTMLElement).style.transform = "translateY(20px)";
  } else {
    const target = (el as HTMLElement).dataset.target;

    if (target === "menu") {
      (el as HTMLElement).style.opacity = "1";
    }
  }
}

function enter(el: Element, done: () => void) {
  if (document.documentElement.clientWidth >= breakpoint) {
    animejs({
      targets: el,
      opacity: 1,
      translateY: 0,
      duration: 250,
      easing: "easeOutExpo",
      complete: done,
    });
  } else {
    animejs({
      targets: el.children[0],
      opacity: [0, 1],
      translateY: [15, 0],
      easing: "linear",
      duration: 150,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }
}

function leave(el: Element, done: () => void) {
  if (document.documentElement.clientWidth >= breakpoint) {
    animejs({
      targets: el,
      opacity: 0,
      translateY: 20,
      duration: 250,
      easing: "easeOutExpo",
      complete: done,
    });
  } else {
    animejs({
      targets: el,
      opacity: [1, 0],
      translateY: [0, 15],
      easing: "linear",
      duration: 150,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }
}
</script>
