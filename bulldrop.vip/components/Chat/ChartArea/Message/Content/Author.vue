<template>
  <div :class="$style.author">
    <div :class="$style['author-data']">
      <DecoratedNickname
        style="display: flex; align-items: center"
        :value="nicknameDecoration"
      >
        {{ truncateString(nickname, 20) }}
        <IconModerator
          v-if="message.messageSender.isModerator"
          :class="[$style.moderator, $style['ml-6']]"
        />

        <IconYoutube
          v-if="message.messageSender.isContentCreator"
          :class="[$style['content-creator'], $style['ml-6']]"
        />
      </DecoratedNickname>
      <div
        v-if="isStaff"
        :class="$style.id"
      >
        #{{ message.messageSender.id }}
        <IconCopy
          :class="$style.copy"
          @click="copy"
        />
      </div>
    </div>
    <Date
      v-if="!showMenu"
      :created-at="message.createdAt.toString()"
    />
  </div>
</template>

<script setup lang="ts">
import { Clipboard } from "@capacitor/clipboard";
import DecoratedNickname from "~/components/DecoratedNickname.vue";
import Date from "./Date.vue";
import type { ChatMessageFull } from "~/api_gen";

type MessageWithMenu = ChatMessageFull & {
  showMenu?: boolean;
  redundant?: boolean;
};

const props = withDefaults(
  defineProps<{
    nickname: string;
    nicknameDecoration?: string;
    message: MessageWithMenu;
    createdAt: string;
    showMenu: boolean;
  }>(),
  {
    nicknameDecoration: "",
  },
);

const { nickname, nicknameDecoration, message, showMenu } = toRefs(props);
const userStore: ReturnType<typeof useUserStore> = useUserStore();
const { isStaff } = (userStore.session?.user as Record<string, any>) ?? {};
const notify = useNotify();

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
  if (nicknameDecoration?.value && decorationColor[nicknameDecoration!.value]) {
    return decorationColor[nicknameDecoration!.value];
  }
  return decorationColor["default"];
});

const copy = async (): Promise<void> => {
  try {
    await Clipboard.write({
      string: message.value.messageSender.id.toString(),
    });
    notify({
      text: "id скопирован",
    });
  } catch (e: any) {
    //
  }
};
</script>

<style lang="scss" module>
.author {
  display: flex;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  justify-content: space-between;
  color: $white-2;

  .author-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .id {
      line-height: 1rem;
      font-size: 0.75rem;
      color: var(--general-grey);
      z-index: 5;
      display: flex;
      align-items: center;

      .copy {
        fill: var(--general-grey);
        width: 12px;
        height: 12px;
        z-index: 10;
        margin-left: 1rem;
        cursor: pointer;
      }
    }
  }

  .content-creator,
  .moderator {
    fill: v-bind(color);
  }

  .ml-6 {
    margin-left: 6px;
  }
}
</style>
