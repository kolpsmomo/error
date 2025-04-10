export const useAudioState = () => {
  const audioIsRequired = useCookie("audioIsRequired").value;
  if (audioIsRequired) {
    useCoreStore().audioIsRequired = JSON.parse(audioIsRequired);
  }
};
