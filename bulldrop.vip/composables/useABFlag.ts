/**
 * Флаг для работы с A/B тестами.
 * Если значение передать как 'flag.var', то будет возвращено
 * значение варианта флага.
 *
 * @param arg - анализируемая строка.
 * @example useABFlag('flag') -> true|false
 * @example useABFlag('flag.var') -> true|false
 * @returns Ref<boolean>
 */
export const useABFlag = (arg: string) => {
  const [flagName, variantName] = arg.split(".");
  const flag = useFlag(flagName);
  const variant = useVariant(flagName);

  return computed(() => {
    if (variantName && variant.value) {
      if (variant.value.name === variantName) {
        return variant.value.enabled;
      } else {
        return false;
      }
    }
    return flag.value;
  });
};
