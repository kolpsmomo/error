type AppColorSettings = {
  mainColor: string;
};

export const useAppColor = ({ mainColor }: AppColorSettings) => {
  useSeoMeta({
    themeColor: mainColor,
  });
};
