type Messages = {
  success: string;
  fail: string;
};

class Clipboard {
  messages: Messages;

  constructor(messages: Messages) {
    this.messages = messages;
  }

  async copy(data: string) {
    const notify = useNotify();
    const self = this;
    try {
      await navigator.clipboard.writeText(data);
      notify({
        text: self.messages.success,
      });
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = data;
      ta.style.position = "absolute";
      ta.style.left = "-999999px";
      document.body.prepend(ta);
      ta.select();
      try {
        document.execCommand("copy");
        notify({
          text: self.messages.success,
        });
      } catch (error) {
        notify({
          type: "error",
          text: self.messages.fail,
        });
      } finally {
        ta.remove();
      }
    }
  }
}

export const useClipboard = () => {
  const { t } = useI18n();
  const success = t("misc.copied_to_clipboard");
  const fail = t("misc.couldnt_copy_to_clipboard");
  return new Clipboard({ success, fail });
};
