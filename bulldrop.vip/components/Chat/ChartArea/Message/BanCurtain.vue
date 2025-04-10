<template>
  <form
    :class="$style['ban-curtain']"
    data-test="ban-curtain"
    @submit.prevent
  >
    <div :class="$style['ban-curtain-inner-container']">
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="0"
          checked
        />
        {{ t("chat.chat_ban_menu.minutes") }}
      </label>
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="1"
        />
        {{ t("chat.chat_ban_menu.hour") }}
      </label>
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="2"
        />
        {{ t("chat.chat_ban_menu.hours") }}
      </label>
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="3"
        />
        {{ t("chat.chat_ban_menu.week") }}
      </label>
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="4"
        />
        {{ t("chat.chat_ban_menu.month") }}
      </label>
      <label>
        <input
          v-model="banType"
          type="radio"
          name="ban_type"
          value="5"
        />
        {{ t("chat.chat_ban_menu.forever") }}
      </label>
    </div>
    <div :class="$style.control">
      <div
        :class="$style['ban-button']"
        @click="$emit('ban', banType)"
      >
        {{ t("chat.chat_ban_menu.ban") }}
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const { t } = useI18n();
const banType = ref("0");
</script>

<style lang="scss" module>
.ban-curtain {
  position: absolute;
  right: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--general-transparent-mid-35);
  padding: 0.25rem;
  border-radius: 0.75rem;
  box-shadow: 2px 4px 10px 0px rgba(20, 22, 26, 0.3);
  backdrop-filter: blur(40px);
  z-index: 20;

  label,
  button {
    font-size: 1rem;
  }

  label {
    position: relative;
    width: 168px;
    padding: 0.5rem 0.75rem;
    color: var(--general-white);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:not(:last-child):before {
      content: "";
      position: absolute;
      left: 8px;
      bottom: 0;
      height: 1px;
      width: calc(100% - 16px);
      border-bottom: 0.6px solid var(--general-grey);
    }

    &:hover input:not(:checked) {
      border-color: lighten($color: $red-1, $amount: 2%);
    }
  }

  input {
    cursor: pointer;
    position: relative;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    border-radius: 50%;
    border: 2px solid var(--general-white);
    transition: 0.15s;

    &:checked {
      border-color: var(--general-white);
    }

    &:checked::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--general-white);
      transform: translate(-50%, -50%);
      transition: 0.15s;
    }
  }

  label,
  .ban-button,
  .cancel-button {
    cursor: pointer;
    font-size: 0.75rem;
    line-height: 1rem;
  }
}

.ban-curtain-inner-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ban-button {
  color: $red-1;
  padding: 0.5rem 0.75rem;

  &:hover {
    color: $red-2;
  }
}

.control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
