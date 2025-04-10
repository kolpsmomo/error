<template>
  <div
    :class="[
      $style.body,
      isNicknameChangeRequested && $style['nickname-popup'],
    ]"
    @close-reply="closeAndClearReply"
  >
    <!-- Баннер скрыт по просьбе Д. Казнова -->
    <!-- <Banner /> -->
    <div :class="$style['body-inner-container']">
      <slot />
    </div>
    <ReplyText
      v-if="textReply"
      :text-reply="textReply"
      :nickname-reply="nicknameReply"
      :nickname-color="nicknameColor"
      @close-reply="closeAndClearReply"
    />

    <div
      v-if="isNicknameChangeRequested"
      :class="$style['nickname-empty-block']"
    ></div>
  </div>
</template>

<script setup lang="ts">
// import Banner from "./Banner/Banner.vue";
import ReplyText from "./ReplyText.vue";

type Props = {
  textReply?: string;
  nicknameReply?: string;
  nicknameColor?: string;
  isNicknameChangeRequested: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  nicknameColor: "",
});

const { textReply, nicknameReply, nicknameColor, isNicknameChangeRequested } =
  toRefs(props);

const emits = defineEmits<{
  (
    e: "close-reply",
    data: { userReplyNickname: string; userReplyText: string },
  ): void;
}>();

const closeAndClearReply = () => {
  emits("close-reply", {
    userReplyNickname: "",
    userReplyText: "",
  });
};
</script>

<style lang="scss" module>
.body {
  position: relative;
  height: calc(100% - 174px);
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    height: calc(100% - 174px);
  }

  .nickname-empty-block {
    height: 88px;
    width: 100%;
  }
}

.body-inner-container {
  min-height: 100%;
}
</style>
