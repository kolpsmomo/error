<template>
  <div>
    <Transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <ChatArea
        v-if="chatAreaIsRequired"
        :online="online"
        @hide-chat-area="emits('hide-chat-area')"
      />
      <ChatButton
        v-else
        :online="online"
        :class="$style['chat-btn']"
        @click="emits('show-chat-area')"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import animejs from "animejs";
import ChatArea from "./Chat/ChatArea.vue";
import ChatButton from "./Chat/ChatButton.vue";

const props = defineProps<{
  chatAreaIsRequired?: boolean;
}>();

const { chatAreaIsRequired } = toRefs(props);
const emits = defineEmits<{
  (e: "hide-chat-area"): void;
  (e: "show-chat-area"): void;
}>();
const api = useApi();
let getOnlineTimer: ReturnType<typeof setTimeout> | undefined = undefined;
let animationTimer: ReturnType<typeof setTimeout> | undefined = undefined;
const online = ref(0);

onPlatformChange(() => {
  if (chatAreaIsRequired.value) {
    emits("hide-chat-area");
    setTimeout(() => {
      emits("show-chat-area");
    }, 200);
  }
});

watch(chatAreaIsRequired, (val: boolean) => {
  if (val && document.body.offsetWidth < 800) {
    document.body.style.overflowY = "hidden";
    document.body.style.maxHeight = "300px";
  } else {
    document.body.style.removeProperty("overflow-y");
    document.body.style.removeProperty("max-height");
  }
});

const getOnline = async () => {
  try {
    const response = await api.chat.getOnlineRetrieve();
    online.value = response.online;
  } catch (error) {
    /* empty */
  } finally {
    getOnlineTimer = setTimeout(getOnline, 60000);
  }
};

onBeforeMount(async () => getOnline());

onBeforeUnmount(() => {
  clearTimeout(getOnlineTimer);
  clearTimeout(animationTimer);
});

const beforeEnter = (el: Element) => {
  const target = (el as HTMLElement).dataset.target;

  if (target === "chat-area") {
    (el as HTMLElement).style.opacity = "0";
  }

  if (target === "chat-button") {
    (el as HTMLElement).style.transform = "scale(0)";
  }
};

const enter = (el: Element, done: () => void) => {
  const target = (el as HTMLElement).dataset.target;

  if (target === "chat-area") {
    animejs({
      targets: el,
      opacity: [0, 1],
      translateY: [15, 0],
      easing: "linear",
      duration: 150,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }

  if (target === "chat-button") {
    animejs({
      targets: el,
      scale: [0, 1],
      easing: "linear",
      duration: 50,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }
};

const leave = (el: Element, done: () => void) => {
  const target = (el as HTMLElement).dataset.target;

  if (target === "chat-area") {
    animejs({
      targets: el,
      opacity: [1, 0],
      translateY: [0, 15],
      easing: "linear",
      duration: 150,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }

  if (target === "chat-button") {
    animejs({
      targets: el,
      scale: [1, 0],
      easing: "linear",
      duration: 50,
      complete: () => (animationTimer = setTimeout(done, 150)),
    });
  }
};
</script>

<style module lang="scss">
.chat-btn {
  display: flex;

  @media screen and (max-width: 1300px) {
    display: none;
  }
}
</style>
