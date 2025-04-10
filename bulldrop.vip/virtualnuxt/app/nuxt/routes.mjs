import { default as about_45ushQgku2yR5aMeta } from "/app/pages/[[platform]]/about-us.vue?macro=true";
import { default as redirecte104672q2xMeta } from "/app/pages/[[platform]]/auth/[social]/redirect.vue?macro=true";
import { default as top_45upwcfWxx960VMeta } from "/app/pages/[[platform]]/balance/top-up.vue?macro=true";
import { default as withdrawalfKoPjT60TyMeta } from "/app/pages/[[platform]]/balance/withdrawal.vue?macro=true";
import { default as balanceDq00rLaUc6Meta } from "/app/pages/[[platform]]/balance.vue?macro=true";
import { default as boss_45battle5G2DXFw88cMeta } from "/app/pages/[[platform]]/boss-battle.vue?macro=true";
import { default as openPy4rWrbOWFMeta } from "/app/pages/[[platform]]/case/open.vue?macro=true";
import { default as change_45emailK7n0JjoxIGMeta } from "/app/pages/[[platform]]/change-email.vue?macro=true";
import { default as confirm_45emailJsWmJaSUd3Meta } from "/app/pages/[[platform]]/confirm-email.vue?macro=true";
import { default as contactsiFuOoP4p2pMeta } from "/app/pages/[[platform]]/contacts.vue?macro=true";
import { default as elfs_45factoryssRyE86UItg7Meta } from "/app/pages/[[platform]]/elfs-factoryss.vue?macro=true";
import { default as eventAY93nfATgrMeta } from "/app/pages/[[platform]]/event.vue?macro=true";
import { default as contractsqrwqa1I69xMeta } from "/app/pages/[[platform]]/games/contracts.vue?macro=true";
import { default as crashO26AuxQSDsMeta } from "/app/pages/[[platform]]/games/crash.vue?macro=true";
import { default as ladderCWtQxpZ61LMeta } from "/app/pages/[[platform]]/games/ladder.vue?macro=true";
import { default as rouletteVskhkjC3lqMeta } from "/app/pages/[[platform]]/games/roulette.vue?macro=true";
import { default as sapper8yivmowz6BMeta } from "/app/pages/[[platform]]/games/sapper.vue?macro=true";
import { default as TowerrpoQcIKtY7Meta } from "/app/pages/[[platform]]/games/Tower.vue?macro=true";
import { default as upgrade1s16LPOC6xMeta } from "/app/pages/[[platform]]/games/upgrade.vue?macro=true";
import { default as wheelHGSJ5IWFPbMeta } from "/app/pages/[[platform]]/games/wheel.vue?macro=true";
import { default as gamesxdbZbWonz3Meta } from "/app/pages/[[platform]]/games.vue?macro=true";
import { default as indexAcYp4RF7TdMeta } from "/app/pages/[[platform]]/index.vue?macro=true";
import { default as merlinsrt358VFfoMMeta } from "/app/pages/[[platform]]/merlins.vue?macro=true";
import { default as mini_45gamessi2eqZjDMRMeta } from "/app/pages/[[platform]]/mini-games.vue?macro=true";
import { default as privacy_45policy4k55bZFp6dMeta } from "/app/pages/[[platform]]/privacy-policy.vue?macro=true";
import { default as profile3KjEUuzfn2Meta } from "/app/pages/[[platform]]/profile.vue?macro=true";
import { default as skibidisssezle1F5SsZMeta } from "/app/pages/[[platform]]/skibidisss.vue?macro=true";
import { default as terms_45and_45conditions8ORfbpaGpxMeta } from "/app/pages/[[platform]]/terms-and-conditions.vue?macro=true";
import { default as user_45settingsZ3Hy4lzZK1Meta } from "/app/pages/[[platform]]/user-settings.vue?macro=true";
export default [
  {
    name: about_45ushQgku2yR5aMeta?.name ?? "platform-about-us",
    path: about_45ushQgku2yR5aMeta?.path ?? "/:platform?/about-us",
    meta: about_45ushQgku2yR5aMeta || {},
    alias: about_45ushQgku2yR5aMeta?.alias || [],
    redirect: about_45ushQgku2yR5aMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/about-us.vue").then(m => m.default || m)
  },
  {
    name: redirecte104672q2xMeta?.name ?? "platform-auth-social-redirect",
    path: redirecte104672q2xMeta?.path ?? "/:platform?/auth/:social()/redirect",
    meta: redirecte104672q2xMeta || {},
    alias: redirecte104672q2xMeta?.alias || [],
    redirect: redirecte104672q2xMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/auth/[social]/redirect.vue").then(m => m.default || m)
  },
  {
    name: balanceDq00rLaUc6Meta?.name ?? "platform-balance",
    path: balanceDq00rLaUc6Meta?.path ?? "/:platform?/balance",
    meta: balanceDq00rLaUc6Meta || {},
    alias: balanceDq00rLaUc6Meta?.alias || [],
    redirect: balanceDq00rLaUc6Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/balance.vue").then(m => m.default || m),
    children: [
  {
    name: top_45upwcfWxx960VMeta?.name ?? "platform-balance-top-up",
    path: top_45upwcfWxx960VMeta?.path ?? "top-up",
    meta: top_45upwcfWxx960VMeta || {},
    alias: top_45upwcfWxx960VMeta?.alias || [],
    redirect: top_45upwcfWxx960VMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/balance/top-up.vue").then(m => m.default || m)
  },
  {
    name: withdrawalfKoPjT60TyMeta?.name ?? "platform-balance-withdrawal",
    path: withdrawalfKoPjT60TyMeta?.path ?? "withdrawal",
    meta: withdrawalfKoPjT60TyMeta || {},
    alias: withdrawalfKoPjT60TyMeta?.alias || [],
    redirect: withdrawalfKoPjT60TyMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/balance/withdrawal.vue").then(m => m.default || m)
  }
]
  },
  {
    name: boss_45battle5G2DXFw88cMeta?.name ?? "platform-boss-battle",
    path: boss_45battle5G2DXFw88cMeta?.path ?? "/:platform?/boss-battle",
    meta: boss_45battle5G2DXFw88cMeta || {},
    alias: boss_45battle5G2DXFw88cMeta?.alias || [],
    redirect: boss_45battle5G2DXFw88cMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/boss-battle.vue").then(m => m.default || m)
  },
  {
    name: openPy4rWrbOWFMeta?.name ?? "platform-case-open",
    path: openPy4rWrbOWFMeta?.path ?? "/:platform?/case/open",
    meta: openPy4rWrbOWFMeta || {},
    alias: openPy4rWrbOWFMeta?.alias || [],
    redirect: openPy4rWrbOWFMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/case/open.vue").then(m => m.default || m)
  },
  {
    name: change_45emailK7n0JjoxIGMeta?.name ?? "platform-change-email",
    path: change_45emailK7n0JjoxIGMeta?.path ?? "/:platform?/change-email",
    meta: change_45emailK7n0JjoxIGMeta || {},
    alias: change_45emailK7n0JjoxIGMeta?.alias || [],
    redirect: change_45emailK7n0JjoxIGMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/change-email.vue").then(m => m.default || m)
  },
  {
    name: confirm_45emailJsWmJaSUd3Meta?.name ?? "platform-confirm-email",
    path: confirm_45emailJsWmJaSUd3Meta?.path ?? "/:platform?/confirm-email",
    meta: confirm_45emailJsWmJaSUd3Meta || {},
    alias: confirm_45emailJsWmJaSUd3Meta?.alias || [],
    redirect: confirm_45emailJsWmJaSUd3Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/confirm-email.vue").then(m => m.default || m)
  },
  {
    name: contactsiFuOoP4p2pMeta?.name ?? "platform-contacts",
    path: contactsiFuOoP4p2pMeta?.path ?? "/:platform?/contacts",
    meta: contactsiFuOoP4p2pMeta || {},
    alias: contactsiFuOoP4p2pMeta?.alias || [],
    redirect: contactsiFuOoP4p2pMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/contacts.vue").then(m => m.default || m)
  },
  {
    name: elfs_45factoryssRyE86UItg7Meta?.name ?? "platform-elfs-factoryss",
    path: elfs_45factoryssRyE86UItg7Meta?.path ?? "/:platform?/elfs-factoryss",
    meta: elfs_45factoryssRyE86UItg7Meta || {},
    alias: elfs_45factoryssRyE86UItg7Meta?.alias || [],
    redirect: elfs_45factoryssRyE86UItg7Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/elfs-factoryss.vue").then(m => m.default || m)
  },
  {
    name: eventAY93nfATgrMeta?.name ?? "platform-event",
    path: eventAY93nfATgrMeta?.path ?? "/:platform?/event",
    meta: eventAY93nfATgrMeta || {},
    alias: eventAY93nfATgrMeta?.alias || [],
    redirect: eventAY93nfATgrMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/event.vue").then(m => m.default || m)
  },
  {
    name: gamesxdbZbWonz3Meta?.name ?? "platform-games",
    path: gamesxdbZbWonz3Meta?.path ?? "/:platform?/games",
    meta: gamesxdbZbWonz3Meta || {},
    alias: gamesxdbZbWonz3Meta?.alias || [],
    redirect: gamesxdbZbWonz3Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/games.vue").then(m => m.default || m),
    children: [
  {
    name: contractsqrwqa1I69xMeta?.name ?? "platform-games-contracts",
    path: contractsqrwqa1I69xMeta?.path ?? "contracts",
    meta: contractsqrwqa1I69xMeta || {},
    alias: contractsqrwqa1I69xMeta?.alias || [],
    redirect: contractsqrwqa1I69xMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/contracts.vue").then(m => m.default || m)
  },
  {
    name: crashO26AuxQSDsMeta?.name ?? "platform-games-crash",
    path: crashO26AuxQSDsMeta?.path ?? "crash",
    meta: crashO26AuxQSDsMeta || {},
    alias: crashO26AuxQSDsMeta?.alias || [],
    redirect: crashO26AuxQSDsMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/crash.vue").then(m => m.default || m)
  },
  {
    name: ladderCWtQxpZ61LMeta?.name ?? "platform-games-ladder",
    path: ladderCWtQxpZ61LMeta?.path ?? "ladder",
    meta: ladderCWtQxpZ61LMeta || {},
    alias: ladderCWtQxpZ61LMeta?.alias || [],
    redirect: ladderCWtQxpZ61LMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/ladder.vue").then(m => m.default || m)
  },
  {
    name: rouletteVskhkjC3lqMeta?.name ?? "platform-games-roulette",
    path: rouletteVskhkjC3lqMeta?.path ?? "roulette",
    meta: rouletteVskhkjC3lqMeta || {},
    alias: rouletteVskhkjC3lqMeta?.alias || [],
    redirect: rouletteVskhkjC3lqMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/roulette.vue").then(m => m.default || m)
  },
  {
    name: sapper8yivmowz6BMeta?.name ?? "platform-games-sapper",
    path: sapper8yivmowz6BMeta?.path ?? "sapper",
    meta: sapper8yivmowz6BMeta || {},
    alias: sapper8yivmowz6BMeta?.alias || [],
    redirect: sapper8yivmowz6BMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/sapper.vue").then(m => m.default || m)
  },
  {
    name: TowerrpoQcIKtY7Meta?.name ?? "platform-games-Tower",
    path: TowerrpoQcIKtY7Meta?.path ?? "Tower",
    meta: TowerrpoQcIKtY7Meta || {},
    alias: TowerrpoQcIKtY7Meta?.alias || [],
    redirect: TowerrpoQcIKtY7Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/Tower.vue").then(m => m.default || m)
  },
  {
    name: upgrade1s16LPOC6xMeta?.name ?? "platform-games-upgrade",
    path: upgrade1s16LPOC6xMeta?.path ?? "upgrade",
    meta: upgrade1s16LPOC6xMeta || {},
    alias: upgrade1s16LPOC6xMeta?.alias || [],
    redirect: upgrade1s16LPOC6xMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/upgrade.vue").then(m => m.default || m)
  },
  {
    name: wheelHGSJ5IWFPbMeta?.name ?? "platform-games-wheel",
    path: wheelHGSJ5IWFPbMeta?.path ?? "wheel",
    meta: wheelHGSJ5IWFPbMeta || {},
    alias: wheelHGSJ5IWFPbMeta?.alias || [],
    redirect: wheelHGSJ5IWFPbMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/games/wheel.vue").then(m => m.default || m)
  }
]
  },
  {
    name: indexAcYp4RF7TdMeta?.name ?? "platform",
    path: indexAcYp4RF7TdMeta?.path ?? "/:platform?",
    meta: indexAcYp4RF7TdMeta || {},
    alias: indexAcYp4RF7TdMeta?.alias || [],
    redirect: indexAcYp4RF7TdMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/index.vue").then(m => m.default || m)
  },
  {
    name: merlinsrt358VFfoMMeta?.name ?? "platform-merlins",
    path: merlinsrt358VFfoMMeta?.path ?? "/:platform?/merlins",
    meta: merlinsrt358VFfoMMeta || {},
    alias: merlinsrt358VFfoMMeta?.alias || [],
    redirect: merlinsrt358VFfoMMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/merlins.vue").then(m => m.default || m)
  },
  {
    name: mini_45gamessi2eqZjDMRMeta?.name ?? "platform-mini-games",
    path: mini_45gamessi2eqZjDMRMeta?.path ?? "/:platform?/mini-games",
    meta: mini_45gamessi2eqZjDMRMeta || {},
    alias: mini_45gamessi2eqZjDMRMeta?.alias || [],
    redirect: mini_45gamessi2eqZjDMRMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/mini-games.vue").then(m => m.default || m)
  },
  {
    name: privacy_45policy4k55bZFp6dMeta?.name ?? "platform-privacy-policy",
    path: privacy_45policy4k55bZFp6dMeta?.path ?? "/:platform?/privacy-policy",
    meta: privacy_45policy4k55bZFp6dMeta || {},
    alias: privacy_45policy4k55bZFp6dMeta?.alias || [],
    redirect: privacy_45policy4k55bZFp6dMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/privacy-policy.vue").then(m => m.default || m)
  },
  {
    name: profile3KjEUuzfn2Meta?.name ?? "platform-profile",
    path: profile3KjEUuzfn2Meta?.path ?? "/:platform?/profile",
    meta: profile3KjEUuzfn2Meta || {},
    alias: profile3KjEUuzfn2Meta?.alias || [],
    redirect: profile3KjEUuzfn2Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/profile.vue").then(m => m.default || m)
  },
  {
    name: skibidisssezle1F5SsZMeta?.name ?? "platform-skibidisss",
    path: skibidisssezle1F5SsZMeta?.path ?? "/:platform?/skibidisss",
    meta: skibidisssezle1F5SsZMeta || {},
    alias: skibidisssezle1F5SsZMeta?.alias || [],
    redirect: skibidisssezle1F5SsZMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/skibidisss.vue").then(m => m.default || m)
  },
  {
    name: terms_45and_45conditions8ORfbpaGpxMeta?.name ?? "platform-terms-and-conditions",
    path: terms_45and_45conditions8ORfbpaGpxMeta?.path ?? "/:platform?/terms-and-conditions",
    meta: terms_45and_45conditions8ORfbpaGpxMeta || {},
    alias: terms_45and_45conditions8ORfbpaGpxMeta?.alias || [],
    redirect: terms_45and_45conditions8ORfbpaGpxMeta?.redirect,
    component: () => import("/app/pages/[[platform]]/terms-and-conditions.vue").then(m => m.default || m)
  },
  {
    name: user_45settingsZ3Hy4lzZK1Meta?.name ?? "platform-user-settings",
    path: user_45settingsZ3Hy4lzZK1Meta?.path ?? "/:platform?/user-settings",
    meta: user_45settingsZ3Hy4lzZK1Meta || {},
    alias: user_45settingsZ3Hy4lzZK1Meta?.alias || [],
    redirect: user_45settingsZ3Hy4lzZK1Meta?.redirect,
    component: () => import("/app/pages/[[platform]]/user-settings.vue").then(m => m.default || m)
  }
]