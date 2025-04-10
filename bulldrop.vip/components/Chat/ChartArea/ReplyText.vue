<template>
  <div :class="$style.replyText">
    <div :class="$style.reply__header">
      <div :class="$style['reply-content-wrapper']">
        <Reply />
        <div :class="$style['reply-content']">
          <div :class="$style.who">
            {{ nicknameReply }}
          </div>
          <div :class="$style.reply__body">
            {{ textReply }}
          </div>
        </div>
      </div>
      <IconClose
        style="cursor: pointer"
        @click="closeReply"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Reply from "~/components/Icon/Reply.vue";

type Props = {
  // Наименование комнаты чата.
  textReply: string;
  // никнейм, которому мы отвечаем
  nicknameReply?: string;
  // цвет никнейма, которому мы отвечаем
  nicknameColor: string;
};

const props = defineProps<Props>();
const { textReply, nicknameReply, nicknameColor } = toRefs(props);
const emits = defineEmits<{
  (e: "close-reply", data: { textReply: boolean }): void;
}>();
const decorationColor: Record<string, string> = {
  default: "#afabc5",
  bubble_gum: "#ff548d",
  sun_beams: "#ffce5a",
  heaven_blue: "#8fb2f7",
  lavender: "#bb96e0",
  coral_reef: "#fc7965",
  olive_green: "#aacc66",
  topaz: "#57d9ce",
  admin: "#ff4d55",
  pacific_gradient: "#2cd7ff",
  club_gradient: "#ec60d0",
  morning_gradient: "#ffc298",
  highest_standard: "#ffcb66",
};

const color = computed<string>(() => {
  if (nicknameColor.value && decorationColor[nicknameColor.value]) {
    return decorationColor[nicknameColor.value];
  }
  return decorationColor["default"];
});

const closeReply = () => {
  emits("close-reply", {
    textReply: true,
  });
};
</script>

<style lang="scss" module>
.replyText {
  position: fixed;
  bottom: 64px;
  left: 0;
  width: 100%;
  padding: 16px 20px 8px;
  background-color: var(--bdrop-chat-area);
  z-index: 10;

  .reply__body,
  .who {
    font-size: 14px;
    line-height: 18px;
  }

  .reply__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .who {
      display: flex;
      align-items: center;
      font-weight: 400;
      color: v-bind(color);
    }
    svg {
      fill: var(--general-white);
    }
  }

  .reply-content-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }

  .reply-content {
    display: flex;
    flex-direction: column;
    border-left: 2px solid v-bind(color);
    padding-left: 0.5rem;
    width: 100%;
  }
  .reply__body {
    font-weight: 400;
    color: var(--general-grey);
    word-break: break-word;
  }
}
</style>
