<template>
  <div :class="$style['case__image-wrapper']">
    <img
      :src="dummyImage"
      :data-srcset="srcset"
      :class="[$style['case__image-bg'], 'lazyload']"
      alt=""
      data-role="case-image-bg"
    />
    <template v-if="props.caseType === 'free'">
      <img
        :class="[$style['case__image'], 'lazyload']"
        :src="dummyImage"
        :data-src="platformImagePath"
        :alt="caseDescription"
        data-role="case-image"
      />
    </template>
    <template v-else>
      <img
        :src="dummyImage"
        :data-src="src"
        :data-srcset="srcset"
        :class="[$style['case__image'], 'lazyload']"
        :alt="caseDescription"
        :title="title"
        data-role="case-image"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { usePlatform } from "~/composables/usePlatform";
import { useCoreStore } from "~/stores/core";
import dummyImage from "~/assets/case-dummy-img.svg";
import defaultImage from "~/assets/case_default.avif";

const props = defineProps<{
  src?: string;
  caseName: string;
  casePrice: number | string;
  caseType: string;
}>();

const { t } = useI18n();
const platform = usePlatform();
const coreStore = useCoreStore();

const platformImagePath = computed(() =>
  props.caseType === "free" ? `/${props.src}.png` : "",
);

const caseDescription = computed(() =>
  t("home.cases.case_descriprion", {
    caseName: props.caseName,
    caseType:
      props.caseType === "free" ? t("home.cases.free_cases") : props.caseType,
    casePrice: props.casePrice,
  }),
);

const title = computed(() => {
  const getPhrase =
    Number(props.casePrice) === 0 ? t("misc.get") : t("misc.buy");

  return t("home.cases.image_title", {
    getPhrase,
    caseName: props.caseName,
    caseType: props.caseType,
    platform: platform.title,
    casePrice: props.casePrice,
  });
});

const isException = computed(() =>
  coreStore.imageSrcsetExceptions.some((name) =>
    props.src?.toLowerCase().endsWith(name?.toLowerCase()),
  ),
);

const srcset = computed(() => {
  if (!props.src) return defaultImage;
  if (isException.value) return props.src;

  if (props.caseType === "free") {
    return `/${props.src}.png`;
  }

  return `${coreStore.cdn}/width=250,quality=90,format=auto/${props.src} 425w,
  ${coreStore.cdn}/width=600,quality=90,format=auto/${props.src} 1420w`;
});
</script>

<style lang="scss" module>
.case__image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.case__image {
  width: 100%;
  aspect-ratio: 1/1 auto;
  display: block;
  margin: auto;
  pointer-events: none;
}

.case__image-bg {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
