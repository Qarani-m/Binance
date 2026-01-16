<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { isLoggedIn, user, logout } = useAuth()
const activeDropdown = ref(null)
const isMobileMenuOpen = ref(false)

const handleLogout = () => {
  logout()
  router.push('/')
}

const tradeDropdown = {
  basic: [
    { name: 'Spot', desc: 'Buy and sell on the Spot market with advanced tools', icon: '📊', path: '/trade/BTC_USDT' },
    { name: 'Margin', desc: 'Increase your profits with leverage', icon: '📈', path: '/margin' },

  ],
  advanced: [
    { name: 'Trading Bots', desc: 'Trade smarter with our various automated strategies - easy and reliable', icon: '🤖' },
    { name: 'Alpha', desc: 'Quick access to Web3 via Alpha Trading', icon: '🌐', path: '/alpha' },
  ]
}

const futuresDropdown = [
  { name: 'USD⊝-M Futures', desc: 'Contracts settled in USDT and USDC', icon: '📄', path: '/futures' },
  { name: 'COIN-M Futures', desc: 'Contracts settled in cryptocurrency', icon: '📄', path: '/coin-m' },
  { name: 'Options', desc: 'USDT Options with limited downside and affordable entry', icon: '📊', path: '/options' }
]

const earnDropdown = [
  { name: 'Overview', desc: 'One-stop portal for all Earn products', icon: '🔒', path: '/earn' },
  {
    name: 'Simple Earn', desc: 'Earn passive income on 300+ crypto assets with flexible and locked terms', icon: '💰',
    path: '/earn/simple'
  },
  {
    name: 'Advanced Earn', desc: 'Maximize your returns with our advanced yield investment products', icon: '📈', path:
      '/earn/advanced'
  },
  { name: 'Loans', desc: 'Access quick and easy loans with competitive rates', icon: '🏦', path: '/earn/loan' }
]

const squareDropdown = [
  { name: 'Square', desc: 'Stay informed with everything crypto', icon: '📶', path: '/square' },
  { name: 'Blog', desc: 'Expand your knowledge and get the latest insights', icon: '📝', path: '/blog' },
  { name: 'Research', desc: 'Institutional-grade analysis, in-depth insights, and more', icon: '🔬', path: '/research' }
]

const moreDropdown = [
  {
    name: 'VIP & Institutional', desc: 'Your trusted digital asset platform for VIPs and institutions', icon: '💎', path:
      '/vip'
  },
  { name: 'Launchpool', desc: 'Discover and gain access to new token launches', icon: '🚀', path: '/launchpool' },
  { name: 'Binance Wallet', desc: 'Access and Navigate Web3 Effortlessly', icon: '👛', path: '/web3wallet' },
  { name: 'Binance Academy', desc: 'Free crypto & blockchain education', icon: '🎓', path: '/academy' }
]

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: true
  }
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    :class="[isFixed ? 'fixed top-0 left-0 right-0 z-[100] h-[64px]' : 'h-[64px] flex-none', 'bg-[#181a20] border-b border-[#2b3139] px-4 md:px-6 flex items-center justify-between']">
    <!-- Left Side: Logo & Nav -->
    <div class="flex items-center gap-2 md:gap-6 h-full">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group shrink-0">
        <svg class="text-primary w-[100px] md:w-[120px]" viewBox="0 0 1000 200" fill="currentColor">
          <text x="0" y="140" font-family="Arial" font-weight="bold" font-size="120" fill="#FCD535">BINANCE</text>
        </svg>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden xl:flex items-center h-full">
        <router-link to="/buy-crypto"
          class="flex items-center h-full px-3 text-[14px] font-medium text-white hover:text-primary transition-colors cursor-pointer whitespace-nowrap">
          Buy Crypto
        </router-link>
        <router-link to="/markets"
          class="flex items-center h-full px-3 text-[14px] font-medium text-white hover:text-primary transition-colors cursor-pointer whitespace-nowrap">
          Markets
        </router-link>

        <!-- Trade Dropdown -->
        <div class="relative h-full" @mouseenter="activeDropdown = 'trade'" @mouseleave="activeDropdown = null">
          <div
            class="flex items-center h-full px-3 text-[14px] font-medium transition-colors cursor-pointer text-white hover:text-primary">
            Trade
            <svg class="ml-1 w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-if="activeDropdown === 'trade'"
            class="absolute top-full left-0 mt-0 w-[600px] bg-[#1e2329] border border-[#2b3139] rounded-lg shadow-2xl p-6 z-[110]">
            <div class="grid grid-cols-2 gap-8">
              <!-- Basic Section -->
              <div>
                <h3 class="text-[#848E9C] text-xs font-semibold mb-4 uppercase">Basic</h3>
                <div class="space-y-1">
                  <component :is="item.path ? 'router-link' : 'a'" v-for="item in tradeDropdown.basic" :key="item.name"
                    :to="item.path" :href="!item.path ? '#' : undefined"
                    class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                    <span class="text-xl mt-0.5">{{ item.icon }}</span>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="text-white text-sm font-medium group-hover:text-primary">{{ item.name }}</span>
                      </div>
                      <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                    </div>
                  </component>
                </div>
              </div>
              <!-- Advanced Section -->
              <div>
                <h3 class="text-[#848E9C] text-xs font-semibold mb-4 uppercase">Advanced</h3>
                <div class="space-y-1">
                  <component :is="item.path ? 'router-link' : 'a'" v-for="item in tradeDropdown.advanced"
                    :key="item.name" :to="item.path" :href="!item.path ? '#' : undefined"
                    class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                    <span class="text-xl mt-0.5">{{ item.icon }}</span>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="text-white text-sm font-medium group-hover:text-primary">{{ item.name }}</span>
                      </div>
                      <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                    </div>
                  </component>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Futures Dropdown -->
        <div class="relative h-full" @mouseenter="activeDropdown = 'futures'" @mouseleave="activeDropdown = null">
          <div
            class="flex items-center h-full px-3 text-[14px] font-medium transition-colors cursor-pointer text-white hover:text-primary">
            Futures
            <svg class="ml-1 w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-if="activeDropdown === 'futures'"
            class="absolute top-full left-0 mt-0 w-[400px] bg-[#1e2329] border border-[#2b3139] rounded-lg shadow-2xl p-4 z-[110]">
            <div class="space-y-1">
              <component :is="item.path ? 'router-link' : 'a'" v-for="item in futuresDropdown" :key="item.name"
                :to="item.path" :href="!item.path ? '#' : undefined"
                class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                <span class="text-xl mt-0.5">{{ item.icon }}</span>
                <div class="flex-1">
                  <span class="text-white text-sm font-medium group-hover:text-primary">{{ item.name }}</span>
                  <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                </div>
              </component>
            </div>
          </div>
        </div>

        <!-- Earn Dropdown -->
        <div class="relative h-full" @mouseenter="activeDropdown = 'earn'" @mouseleave="activeDropdown = null">
          <div
            class="flex items-center h-full px-3 text-[14px] font-medium transition-colors cursor-pointer text-white hover:text-primary">
            Earn
            <svg class="ml-1 w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-if="activeDropdown === 'earn'"
            class="absolute top-full left-0 mt-0 w-[360px] bg-[#1e2329] border border-[#2b3139] rounded-lg shadow-2xl p-4 z-[110]">
            <div class="space-y-1">
              <component :is="item.path ? 'router-link' : 'a'" v-for="item in earnDropdown" :key="item.name"
                :to="item.path" :href="!item.path ? '#' : undefined"
                class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                <span class="text-xl mt-0.5">{{ item.icon }}</span>
                <div class="flex-1">
                  <span class="text-white text-sm font-medium group-hover:text-primary block">{{ item.name }}</span>
                  <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                </div>
              </component>
            </div>
          </div>
        </div>

        <!-- Square Dropdown -->
        <div class="relative h-full" @mouseenter="activeDropdown = 'square'" @mouseleave="activeDropdown = null">
          <div
            class="flex items-center h-full px-3 text-[14px] font-medium transition-colors cursor-pointer text-white hover:text-primary">
            Square
            <svg class="ml-1 w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-if="activeDropdown === 'square'"
            class="absolute top-full left-0 mt-0 w-[320px] bg-[#1e2329] border border-[#2b3139] rounded-lg shadow-2xl p-4 z-[110]">
            <div class="space-y-1">
              <component :is="item.path ? 'router-link' : 'a'" v-for="item in squareDropdown" :key="item.name"
                :to="item.path" :href="!item.path ? '#' : undefined"
                class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                <span class="text-xl mt-0.5">{{ item.icon }}</span>
                <div class="flex-1">
                  <span class="text-white text-sm font-medium group-hover:text-primary block">{{ item.name }}</span>
                  <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                </div>
              </component>
            </div>
          </div>
        </div>

        <!-- More Dropdown -->
        <div class="relative h-full" @mouseenter="activeDropdown = 'more'" @mouseleave="activeDropdown = null">
          <div
            class="flex items-center h-full px-3 text-[14px] font-medium transition-colors cursor-pointer text-white hover:text-primary">
            More
            <svg class="ml-1 w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-if="activeDropdown === 'more'"
            class="absolute top-full left-0 mt-0 w-[600px] bg-[#1e2329] border border-[#2b3139] rounded-lg shadow-2xl p-6 z-[110]">
            <div class="grid grid-cols-2 gap-x-8 gap-y-1">
              <component :is="item.path ? 'router-link' : 'a'" v-for="item in moreDropdown" :key="item.name"
                :to="item.path" :href="!item.path ? '#' : undefined"
                class="flex items-start gap-3 p-3 rounded hover:bg-[#2b3139] transition-colors group">
                <span class="text-xl mt-0.5">{{ item.icon }}</span>
                <div class="flex-1">
                  <span class="text-white text-sm font-medium group-hover:text-primary block">{{ item.name }}</span>
                  <p class="text-[#848E9C] text-xs mt-0.5">{{ item.desc }}</p>
                </div>
              </component>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Right Side: Utils & Auth -->
    <div class="flex items-center gap-2 md:gap-4 h-full">
      <!-- Desktop Utils -->
      <div class="hidden sm:flex items-center gap-4">
        <button class="p-1.5 text-white hover:text-primary transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <template v-if="!isLoggedIn">
          <router-link to="/login"
            class="text-[14px] font-medium text-white hover:text-primary transition-colors whitespace-nowrap">Log
            In</router-link>

          <router-link to="/register"
            class="bg-primary hover:bg-[#F0B90B] text-black px-4 py-1.5 rounded-[4px] font-medium text-[14px] transition-colors whitespace-nowrap">
            Sign Up
          </router-link>
        </template>

        <template v-else>
          <div class="flex items-center gap-4">
            <router-link to="/dashboard" class="flex items-center gap-2 group">
              <div
                class="w-8 h-8 rounded-full bg-[#2b3139] flex items-center justify-center text-primary font-bold text-sm">
                {{ user?.email?.[0]?.toUpperCase() || 'U' }}
              </div>
              <span
                class="text-[14px] font-medium text-white group-hover:text-primary transition-colors max-w-[100px] truncate">
                {{ user?.email }}
              </span>
            </router-link>
            <button @click="handleLogout"
              class="text-[14px] font-medium text-[#848E9C] hover:text-[#F6465D] transition-colors">
              Log Out
            </button>
          </div>
        </template>

        <div class="w-px h-5 bg-[#2b3139]"></div>

        <button class="text-[#848E9C] hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18l0-12m-4 8l4 4 4-4m5 10H7" />
          </svg>
        </button>
      </div>

      <!-- Mobile Sign Up (Compact) -->
      <router-link to="/register"
        class="sm:hidden bg-primary text-black px-3 py-1.5 rounded-[4px] font-bold text-[12px] whitespace-nowrap">Sign
        Up</router-link>

      <!-- Mobile Menu Toggle -->
      <button @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="xl:hidden p-2 text-white hover:text-primary transition-colors">
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMobileMenuOpen"
      class="xl:hidden fixed inset-0 top-[64px] bg-[#0b0e11] z-[90] overflow-y-auto p-6 flex flex-col gap-8 pb-32">
      <div class="space-y-6">
        <router-link to="/buy-crypto" @click="closeMobileMenu"
          class="block text-[20px] font-bold text-white hover:text-primary transition-colors">Buy Crypto</router-link>
        <router-link to="/markets" @click="closeMobileMenu"
          class="block text-[20px] font-bold text-white hover:text-primary transition-colors">Markets</router-link>

        <div class="pt-4 border-t border-[#2b3139] space-y-6">
          <h3 class="text-[#848E9C] text-sm font-bold uppercase tracking-wider">Services</h3>
          <div class="grid grid-cols-1 gap-6">
            <router-link to="/trade/BTC_USDT" @click="closeMobileMenu" class="text-white font-medium text-[16px]">Spot
              Trading</router-link>
            <router-link to="/futures" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Futures</router-link>
            <router-link to="/options" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Options</router-link>
            <router-link to="/alpha" @click="closeMobileMenu" class="text-white font-medium text-[16px]">Alpha
              Trading</router-link>
            <router-link to="/earn" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Earn</router-link>
            <router-link to="/square" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Square</router-link>
            <router-link to="/vip" @click="closeMobileMenu" class="text-white font-medium text-[16px]">VIP</router-link>
            <router-link to="/academy" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Academy</router-link>
            <router-link to="/launchpool" @click="closeMobileMenu"
              class="text-white font-medium text-[16px]">Launchpool</router-link>
          </div>
        </div>
      </div>

      <div class="mt-auto flex flex-col gap-4">
        <template v-if="!isLoggedIn">
          <router-link to="/login" @click="closeMobileMenu"
            class="w-full bg-[#2b3139] text-white font-bold py-3 rounded-lg text-center">Log In</router-link>
          <router-link to="/register" @click="closeMobileMenu"
            class="w-full bg-primary text-black font-extrabold py-3 rounded-lg text-center">Sign Up</router-link>
        </template>
        <template v-else>
          <div class="p-4 bg-[#1e2329] rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-[#2b3139] flex items-center justify-center text-primary font-bold">
                {{ user?.email?.[0]?.toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white font-bold truncate">{{ user?.email }}</div>
                <div class="text-[#848E9C] text-xs">Standard User</div>
              </div>
            </div>
            <button @click="handleLogout(); closeMobileMenu()"
              class="w-full bg-[#F6465D]/10 text-[#F6465D] font-bold py-3 rounded-lg">Log Out</button>
          </div>
        </template>
      </div>
    </div>
  </header>
  <!-- Spacer for fixed header -->
  <div v-if="isFixed" class="h-[64px]"></div>
</template>
