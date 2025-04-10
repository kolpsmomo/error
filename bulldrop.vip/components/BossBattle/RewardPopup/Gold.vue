<template>
  <div :class="$style['reward-popup-gold']">
    <img
      :src="src"
      alt="gold"
      :style="{ opacity: imageIsLoaded ? 1 : 0 }"
      @load="imageIsLoaded = true"
      @dragstart.prevent
    />
  </div>
</template>

<script setup lang="ts">
import few from "~/assets/boss-battle/few.png";
import average from "~/assets/boss-battle/average.png";
import lot from "~/assets/boss-battle/lot.png";

const props = defineProps<{
  amount: "few" | "average" | "lot";
}>();

const src = computed<string>(() => {
  if (props.amount === "few") {
    return few;
  } else if (props.amount === "average") {
    return average;
  } else {
    return lot;
  }
});

const imageIsLoaded = ref<boolean>(false);
</script>

<style lang="scss" module>
.reward-popup-gold {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: var(--general-background);

  img {
    display: block;
    max-width: 200px;
    max-height: 100%;
    margin: auto;
    transition: 0.25s;
  }
}
</style>
