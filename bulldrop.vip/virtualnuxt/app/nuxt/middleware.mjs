import validate from "/app/node_modules/nuxt/dist/pages/runtime/validate.js";
import _01_45platform_45identifier_45global from "/app/middleware/01.platform-identifier.global.ts";
import _02_45platform_45designer_45global from "/app/middleware/02.platform-designer.global.ts";
import manifest_45route_45rule from "/app/node_modules/nuxt/dist/app/middleware/manifest-route-rule.js";
export const globalMiddleware = [
  validate,
  _01_45platform_45identifier_45global,
  _02_45platform_45designer_45global,
  manifest_45route_45rule
]
export const namedMiddleware = {}