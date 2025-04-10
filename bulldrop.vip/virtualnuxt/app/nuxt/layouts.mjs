export default {
  default: () => import("/app/layouts/default.vue").then(m => m.default || m)
}