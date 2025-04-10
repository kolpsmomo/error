<template>
  <PopupOverlay>
    <Popup
      :class="$style.popup"
      :closable="true"
    >
      <div :class="$style.header">
        {{ t("platform.welcome") }}
      </div>
      <div :class="$style.caption">
        {{ t("platform.what_game") }}
      </div>
      <PlatformItems
        :class="$style.items"
        size="md"
        is-selectable
      />
    </Popup>
  </PopupOverlay>
</template>

<script setup lang="ts">
import PopupOverlay from "./PopupOverlay.vue";
import Popup from "./Popup.vue";
import PlatformItems from "./PlatformItems.vue";

const { t } = useI18n();
</script>

<style module lang="scss">
.popup {
  max-width: 469px;
  width: 100%;

  @media screen and (max-width: 475px) {
    max-width: 384px;
    margin: 0 20px;
    padding: 18px !important;
  }
}

.header {
  font-size: 24px;
  line-height: 28px;
  padding-right: 30px;
}

.caption {
  font-size: 16px;
  margin-top: 10px;
  line-height: 16px;

  @media screen and (max-width: 475px) {
    margin-top: 10px;
  }
}

.items {
  margin-top: 24px;
  display: grid;
  grid-template-areas:
    "a a a b b b"
    "c c d d e e";
  grid-template-rows: 1fr auto;
  grid-row-gap: 12px;
  grid-column-gap: 12px;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media screen and (max-width: 475px) {
    grid-row-gap: 6px;
    grid-column-gap: 6px;
  }
  & > :first-child {
    grid-area: a;
  }

  & > :nth-child(2) {
    grid-area: b;
  }

  & > div {
    height: 180px;

    @media screen and (max-width: 475px) {
      height: 162px;
    }
  }

  & > :nth-child(n + 3) {
    height: 160px;

    @media screen and (max-width: 475px) {
      height: 127px;
    }
  }

  & > :nth-child(3) {
    grid-area: c;
  }

  & > :nth-child(4) {
    grid-area: d;
  }

  & > :nth-child(5) {
    grid-area: e;
  }
}

.button {
  margin-top: 24px;
}
</style>
