<template>
  <Container
    :class="$style['chat-rules-container']"
    @hide-form="$emit('hide-chat-rules')"
  >
    <Form
      :class="$style.popup"
      :show-close-button="false"
      style="margin: 0"
      @hide-form="$emit('hide-chat-rules')"
    >
      <div :class="$style['chat-rules']">
        <h1 :class="$style.title">{{ t("chat.chat_rules.title") }}</h1>
        <div
          v-html="t('chat.chat_rules.att') + ':'"
          :class="$style.caption"
        />
        <div
          v-html="t('chat.chat_rules.list')"
          :class="$style.list"
        />
        <button
          data-test="chat_rulse_close_btn"
          @click="$emit('hide-chat-rules')"
        >
          {{ t("chat.chat_rules.accept") }}
        </button>
      </div>
    </Form>
  </Container>
</template>

<script setup lang="ts">
import Form from "~/components/Form/Form.vue";
import Container from "~/components/Form/Container.vue";

const { t } = useI18n();
</script>

<style module lang="scss">
.chat-rules {
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
  }

  p {
    margin: 16px 0 0 0;
  }

  ul {
    margin: 0;
    padding: 0px;
    padding-left: 20px;
    ::marker {
      color: $red-1;
    }
  }

  span {
    margin-top: 12px;

    svg {
      margin: -10px 8px 0 0;
    }
  }

  button {
    margin-top: 14px;
    height: 48px;
    background: var(--button-tonal-default);
    border-radius: 10px;
    border: none;
    outline: none;
    color: var(--general-white);

    &:hover {
      background: var(--button-tonal-hover);
    }

    &:active {
      background: var(--button-tonal-active);
      color: var(--general-background);
    }
  }
}

.popup {
  max-width: 355px;
  width: 100% !important;
  padding: 24px 28px 28px !important;
  border: solid 1px var(--general-stroke);

  @media (max-width: 801px) {
    padding-left: 24px !important;
    padding-right: 24px !important;
    padding-bottom: 24px !important;
  }

  @media (max-width: 475px) {
    padding-left: 20px !important;
    padding-right: 20px !important;
    padding-bottom: 20px !important;
  }
}

.title {
  font-size: 24px;
  line-height: 28px;
  padding-bottom: 20px;
  border-bottom: solid 1px var(--general-stroke);
}

.caption {
  margin-top: 24px;
  font-size: 14px;
  line-height: 16px;
  color: var(--general-grey);
}

.list {
  margin-top: 16px;

  ul {
    padding-left: 0;
    margin-top: 0;
  }

  li {
    padding-left: calc(22px + 11px);
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 20px;
    position: relative;

    &::before {
      position: absolute;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'%3E%3Cg clip-path='url(%23Clip074634269)'%3E%3Cpath d='M22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11Z' fill='%231F4A39' fill-opacity='0.38'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.8179 7.40529C15.1924 7.67279 15.2791 8.19325 15.0116 8.56776L10.845 14.4011C10.6926 14.6144 10.4489 14.7435 10.1869 14.7498C9.92488 14.7561 9.67519 14.6388 9.51279 14.4331L7.01279 11.2664C6.72761 10.9052 6.78926 10.3812 7.15049 10.096C7.51173 9.81081 8.03575 9.87246 8.32093 10.2337L10.1335 12.5297L13.6554 7.59903C13.9229 7.22452 14.4434 7.13778 14.8179 7.40529Z' fill='%235AED90'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip074634269'%3E%3Crect width='22' height='22' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
      @include square(22px);
      left: 0;
      top: -2px;
    }

    &::marker {
      color: transparent;
    }
  }
}
</style>
