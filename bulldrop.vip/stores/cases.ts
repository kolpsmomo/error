import type {
  CaseListsByCollections,
  FreeSocialCaseCollection,
} from "~/api_gen";
import type { PlatformName } from "~/types";

export const useCasesStore = defineStore("casesStore", () => {
  type Cases = Record<
    PlatformName,
    {
      paidCases: CaseListsByCollections[];
      freeCases: FreeSocialCaseCollection | null;
      isLoading: boolean;
    }
  >;

  const cases: Cases = reactive({
    standoff: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
    cs2: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
    pubg: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
    bgmi: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
    roblox: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
    genshin: {
      paidCases: [],
      freeCases: null,
      isLoading: false,
    },
  });

  const refreshCasesCollection = ref(false);

  const showCasesSkeleton = computed(() => {
    const platform = usePlatform();
    return (
      !cases[`${platform.code}`].paidCases.length ||
      cases[`${platform.code}`].isLoading
    );
  });

  async function getCases() {
    const api = useApi();
    const platform = usePlatform();
    const platformCode = platform.code;

    if (cases[platformCode].isLoading) return;

    try {
      cases[platformCode].isLoading = true;
      cases[platformCode].paidCases = await api.cases.byCollectionsList();
    } catch (error) {
      /* empty */
    } finally {
      cases[platformCode].isLoading = false;
    }
  }

  async function getFreeCases() {
    const api = useApi();
    const platform = usePlatform();
    const platformCode = platform.code;

    if (cases[platformCode].isLoading) return;

    try {
      cases[platformCode].isLoading = true;
      cases[platformCode].freeCases = await api.cases.freeCasesRetrieve();
    } catch (error) {
      /* empty */
    } finally {
      cases[platformCode].isLoading = false;
    }
  }

  function dropCases() {
    for (const key in cases) {
      cases[key as PlatformName].paidCases = [];
      cases[key as PlatformName].freeCases = null;
      cases[key as PlatformName].isLoading = false;
    }
  }

  return {
    cases,
    refreshCasesCollection,
    showCasesSkeleton,
    getCases,
    getFreeCases,
    dropCases,
  };
});
