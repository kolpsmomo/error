<template>
  <button
    :class="[
      gain && $style.gain,
      decrease && $style.decrease,
      $style['balance-button'],
    ]"
    data-test="balance-button"
    @click="handleClick"
    @animationend="handleAnimationend"
  >
    <span><IconBullcoin /> {{ balance }}</span>
    <div :class="$style['plus-icon']">
      <IconPlus />
    </div>
  </button>
</template>

<script setup lang="ts">
import { normalize } from "~/utils/url/normalize";

const gain = ref(false);
const decrease = ref(false);
const userStore = useUserStore();
const { session } = storeToRefs(userStore);
const coreStore = useCoreStore();
const balance = computed(() => toLocalNumber(session.value.user?.balance || 0));

watch(balance, (newValue, oldValue) => {
  if (newValue > oldValue) {
    gain.value = true;
  } else {
    decrease.value = true;
  }
});

const handleClick = () => {
  if (coreStore.headerMenuIsRequired) coreStore.hideMenuHeader();
  navigateTo(normalize(`/balance/top-up`));
};

const handleAnimationend = () => {
  gain.value = false;
  decrease.value = false;
};
</script>

<style lang="scss" module>
.balance-button {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 0 25px;
  padding: 0 4px 0 20px;
  border-radius: $br10;
  background: var(--general-transparent-mid-35);
  border: 1px solid var(--general-stroke);
  outline: none !important;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--general-white);
  transition: 0.25s;

  &:hover {
    background-color: var(--general-transparent-mid-55);
  }

  &:active {
    background-color: var(--button-outlined-fill-pressed);
  }

  @media screen and (max-width: 800px) {
    margin: 0;
  }

  @media screen and (max-width: 475px) {
    font-size: 14px;
    height: 40px;
  }
  @media screen and (max-width: 375px) {
    font-size: 12px;
    white-space: nowrap;
  }

  .plus-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    margin-left: 10px;
    background: var(--button-functional-default);
    svg {
      fill: var(--general-white);
      width: 14px;
      height: 14px;
    }
  }
}

.gain {
  animation: gain 2s forwards;
}

.decrease {
  animation: decrease 2s forwards;
}

@keyframes gain {
  0% {
    color: rgb(0, 255, 114);
    fill: rgb(0, 255, 114);
  }
  100% {
    color: var(--bdrop-price2);
  }
}

@keyframes decrease {
  0% {
    color: red;
    fill: red;
  }
  100% {
    color: var(--bdrop-price2);
  }
}
</style>
