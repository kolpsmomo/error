
// @ts-nocheck


export const localeCodes =  [
  "ru",
  "en",
  "uz"
]

export const localeLoaders = {
  "ru": [{ key: "../locales/ru.json", load: () => import("../locales/ru.json" /* webpackChunkName: "locale__app_locales_ru_json" */), cache: true }],
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale__app_locales_en_json" */), cache: true }],
  "uz": [{ key: "../locales/uz.json", load: () => import("../locales/uz.json" /* webpackChunkName: "locale__app_locales_uz_json" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": false,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "ru",
      "name": "Русский",
      "files": [
        "locales/ru.json"
      ]
    },
    {
      "code": "en",
      "name": "English",
      "files": [
        "locales/en.json"
      ]
    },
    {
      "code": "uz",
      "name": "O'zbek",
      "files": [
        "locales/uz.json"
      ]
    }
  ],
  "defaultLocale": "ru",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "django_language",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "all",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "ru",
    "name": "Русский",
    "files": [
      {
        "path": "locales/ru.json"
      }
    ]
  },
  {
    "code": "en",
    "name": "English",
    "files": [
      {
        "path": "locales/en.json"
      }
    ]
  },
  {
    "code": "uz",
    "name": "O'zbek",
    "files": [
      {
        "path": "locales/uz.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
