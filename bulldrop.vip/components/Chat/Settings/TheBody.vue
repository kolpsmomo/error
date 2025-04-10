<template>
  <div :class="$style.body">
    <div>
      <SettingsPermissions
        :range-value="cooldown"
        @set-range-value="setCooldown"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsPermissions from "~/components/Chat/ChartArea/UserSettings/SettingsPermissions.vue";
import { debounce } from "~/components/Chat/ChartArea/UserSettings/utils";

type Props = {
  cooldown: number;
};

const props = defineProps<Props>();
const { cooldown } = toRefs(props);

const api = useApi();
const processCooldown = debounce((val: number) => {
  api.chat.updatePartialUpdate({
    patchedChatSettingsUpdateRequest: {
      cooldown: val,
    },
  });
});

const setCooldown = (val: number) => {
  processCooldown(val);
};
</script>

<style lang="scss" module>
.body {
  margin-top: 1.5rem;
}
</style>
