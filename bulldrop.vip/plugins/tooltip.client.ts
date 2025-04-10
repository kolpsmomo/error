// Данная директива используется для добавления элемента-подсказки к элементу, к которому она применена.
// В качестве целевого элемента может выступать как HTMLElement так и кастомный компонент. По умолчанию тултип
// будет отображаться сверху, но можно указывать следующие аргументы:
//
// * "top"
// * "top-start"
// * "top-end"
// * "right"
// * "right-start"
// * "right-end"
// * "bottom"
// * "bottom-start"
// * "bottom-end"
// * "left"
// * "left-start"
// * "left-end"
//
//
// <template>
//     <div v-tooltip="content">I have tooltip!</div>
//     <div v-tooltip:top-start="content">I have tooltip!</div>
//     <div v-tooltip:bottom="content">I have tooltip!</div>
//     <SomeComponent v-tooltip="content">I have tooltip!</SomeComponent>
// </template>

// <script setup lang="ts">
// const content = "Hi friend, I'm tooltip!"
// </script>
// ```

import type { DirectiveBinding } from "vue";
import type { Instance } from "tippy.js";
import tippy from "tippy.js";

type TooltipHTMLElement = HTMLElement & { tooltip?: Instance };

type Arg =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("tooltip", {
    mounted(el: TooltipHTMLElement, binding: DirectiveBinding) {
      if (!binding.value) return;
      const tooltip: Instance = tippy(el, {
        content: binding.value,
        placement: (binding.arg as Arg) || "top",
        theme: "bd-tooltip-theme",
        allowHTML: Boolean(binding.modifiers.html),
      });

      if (binding.modifiers.show) {
        tooltip.show();
      }

      el.tooltip = tooltip;
    },
    unmounted(el: TooltipHTMLElement) {
      if (el.tooltip !== undefined) {
        el.tooltip.destroy();
      }
    },
  });
});
