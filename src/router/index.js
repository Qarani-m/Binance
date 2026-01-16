import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardPage.vue"),
    },
    {
      path: "/trade/:pair",
      name: "spot-trading",
      component: () => import("@/views/SpotTradingPage.vue"),
    },
    {
      path: "/futures",
      name: "futures-trading",
      component: () => import("@/views/FuturesTradingPage.vue"),
    },
    {
      path: "/coin-m",
      name: "coin-m-trading",
      component: () => import("@/views/CoinMFuturesTradingPage.vue"),
    },
    {
      path: "/options",
      name: "options-trading",
      component: () => import("@/views/OptionsTradingPage.vue"),
    },
    {
      path: "/margin",
      name: "margin-trading",
      component: () => import("@/views/MarginTradingPage.vue"),
    },
    {
      path: "/earn",
      name: "earn-overview",
      component: () => import("@/views/EarnOverviewPage.vue"),
    },
    {
      path: "/earn/simple",
      name: "simple-earn",
      component: () => import("@/views/SimpleEarnPage.vue"),
    },
    {
      path: "/earn/advanced",
      name: "advanced-earn",
      component: () => import("@/views/AdvancedEarnPage.vue"),
    },
    {
      path: "/earn/loan",
      name: "loan",
      component: () => import("@/views/LoanPage.vue"),
    },
    {
      path: "/square",
      name: "square",
      component: () => import("@/views/SquarePage.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/BlogPage.vue"),
    },
    {
      path: "/research",
      name: "research",
      component: () => import("@/views/ResearchPage.vue"),
    },
    {
      path: "/vip",
      name: "vip",
      component: () => import("@/views/VIPInstitutionalPage.vue"),
    },
    {
      path: "/academy",
      name: "academy",
      component: () => import("@/views/AcademyPage.vue"),
    },
    {
      path: "/web3wallet",
      name: "wallet",
      component: () => import("@/views/WalletPage.vue"),
    },
    {
      path: "/launchpool",
      name: "launchpool",
      component: () => import("@/views/LaunchpoolPage.vue"),
    },
    {
      path: "/markets",
      name: "markets",
      component: () => import("@/views/MarketPage.vue"),
    },
    {
      path: "/buy-crypto",
      name: "buy-crypto",
      component: () => import("@/views/BuyCryptoPage.vue"),
    },
    {
      path: "/alpha",
      name: "alpha-trading",
      component: () => import("@/views/AlphaTradingPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/wallet/deposit/crypto",
      name: "deposit-crypto",
      component: () => import("@/views/DepositCryptoPage.vue"),
    },
    {
      path: "/wallet/withdraw/crypto",
      name: "withdraw-crypto",
      component: () => import("@/views/WithdrawCryptoPage.vue"),
    },
    {
      path: "/wallet/transfer",
      name: "internal-transfer",
      component: () => import("@/views/InternalTransferPage.vue"),
    },
    {
      path: "/price/:ticker",
      name: "price-page",
      component: () => import("@/views/PricePage.vue"),
    },
    {
      path: "/verify-account",
      name: "verify-account",
      component: () => import("@/views/IdentityVerificationPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth();
  const publicPages = ["/", "/login", "/register", "/markets"];
  const authRequired =
    !publicPages.includes(to.path) &&
    !to.path.startsWith("/trade/") &&
    !to.path.startsWith("/price/");
  const isAuthPage = ["/login", "/register"].includes(to.path);

  if (authRequired && !isLoggedIn.value) {
    return next("/login");
  }

  if (isAuthPage && isLoggedIn.value) {
    return next("/dashboard");
  }

  next();
});

export default router;
