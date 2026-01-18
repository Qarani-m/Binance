import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomePage.vue"),
      meta: { title: "Binance - Cryptocurrency Exchange" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardPage.vue"),
      meta: { title: "Dashboard | Binance" },
    },
    {
      path: "/markets",
      name: "markets",
      component: () => import("@/views/MarketPage.vue"),
      meta: { title: "Markets Overview | Binance" },
    },
    {
      path: "/trade/:pair",
      name: "spot-trading",
      component: () => import("@/views/SpotTradingPage.vue"),
      meta: { title: "Spot Trading | Binance" },
    },
    {
      path: "/futures",
      name: "futures-trading",
      component: () => import("@/views/FuturesTradingPage.vue"),
      meta: { title: "Futures Trading | Binance" },
    },
    {
      path: "/coin-m",
      name: "coin-m-trading",
      component: () => import("@/views/CoinMFuturesTradingPage.vue"),
      meta: { title: "Coin-M Futures | Binance" },
    },
    {
      path: "/options",
      name: "options-trading",
      component: () => import("@/views/OptionsTradingPage.vue"),
      meta: { title: "Options Trading | Binance" },
    },
    {
      path: "/margin",
      name: "margin-trading",
      component: () => import("@/views/MarginTradingPage.vue"),
      meta: { title: "Margin Trading | Binance" },
    },
    {
      path: "/earn",
      name: "earn-overview",
      component: () => import("@/views/EarnOverviewPage.vue"),
      meta: { title: "Earn | Binance" },
    },
    {
      path: "/earn/simple",
      name: "simple-earn",
      component: () => import("@/views/SimpleEarnPage.vue"),
      meta: { title: "Simple Earn | Binance" },
    },
    {
      path: "/earn/advanced",
      name: "advanced-earn",
      component: () => import("@/views/AdvancedEarnPage.vue"),
      meta: { title: "Advanced Earn | Binance" },
    },
    {
      path: "/earn/loan",
      name: "loan",
      component: () => import("@/views/LoanPage.vue"),
      meta: { title: "Crypto Loans | Binance" },
    },
    {
      path: "/square",
      name: "square",
      component: () => import("@/views/SquarePage.vue"),
      meta: { title: "Binance Square" },
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/BlogPage.vue"),
      meta: { title: "Blog | Binance" },
    },
    {
      path: "/research",
      name: "research",
      component: () => import("@/views/ResearchPage.vue"),
      meta: { title: "Research | Binance" },
    },
    {
      path: "/vip",
      name: "vip",
      component: () => import("@/views/VIPInstitutionalPage.vue"),
      meta: { title: "VIP & Institutional | Binance" },
    },
    {
      path: "/academy",
      name: "academy",
      component: () => import("@/views/AcademyPage.vue"),
      meta: { title: "Binance Academy" },
    },
    {
      path: "/web3wallet",
      name: "wallet",
      component: () => import("@/views/WalletPage.vue"),
      meta: { title: "Web3 Wallet | Binance" },
    },
    {
      path: "/launchpool",
      name: "launchpool",
      component: () => import("@/views/LaunchpoolPage.vue"),
      meta: { title: "Launchpool | Binance" },
    },
    {
      path: "/markets",
      name: "markets",
      component: () => import("@/views/MarketPage.vue"),
      meta: { title: "Markets | Binance" },
    },
    {
      path: "/buy-crypto",
      name: "buy-crypto",
      component: () => import("@/views/BuyCryptoPage.vue"),
      meta: { title: "Buy Crypto | Binance" },
    },
    {
      path: "/alpha",
      name: "alpha-trading",
      component: () => import("@/views/AlphaTradingPage.vue"),
      meta: { title: "Alpha Trading | Binance" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginPage.vue"),
      meta: { title: "Login | Binance" },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterPage.vue"),
      meta: { title: "Register | Binance" },
    },
    {
      path: "/wallet/deposit/crypto",
      name: "deposit-crypto",
      component: () => import("@/views/DepositCryptoPage.vue"),
      meta: { title: "Deposit Crypto | Binance" },
    },
    {
      path: "/wallet/withdraw/crypto",
      name: "withdraw-crypto",
      component: () => import("@/views/WithdrawCryptoPage.vue"),
      meta: { title: "Withdraw Crypto | Binance" },
    },
    {
      path: "/wallet/transfer",
      name: "internal-transfer",
      component: () => import("@/views/InternalTransferPage.vue"),
      meta: { title: "Internal Transfer | Binance" },
    },
    {
      path: "/price/:ticker",
      name: "price-page",
      component: () => import("@/views/PricePage.vue"),
      meta: { title: "Price | Binance" },
    },
    {
      path: "/verify-account",
      name: "verify-account",
      component: () => import("@/views/IdentityVerificationPage.vue"),
      meta: { title: "Verify Account | Binance" },
    },
    {
      path: "/checkout/buy",
      name: "buy-checkout",
      component: () => import("@/views/BuyUSDCConfirm.vue"),
      meta: { title: "Buy Checkout | Binance" },
    },
    {
      path: "/checkout/sell",
      name: "sell-checkout",
      component: () => import("@/views/SellUSDCConfirm.vue"),
      meta: { title: "Sell Checkout | Binance" },
    },
    {
      path: "/success",
      name: "stripe-success",
      component: () => import("@/views/StripeSuccessPage.vue"),
      meta: { title: "Success | Binance" },
    },
    {
      path: "/cancel",
      name: "stripe-cancel",
      redirect: "/buy-crypto",
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

// Update page title based on route meta
router.afterEach((to) => {
  document.title = to.meta.title || "Binance - Cryptocurrency Exchange";
});

export default router;
