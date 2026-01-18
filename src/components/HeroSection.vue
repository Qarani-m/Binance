<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()
const activeTab = ref('popular')
const userCount = ref(303851303)
const ws = ref(null)

// Badge hover states
const badge1Hovered = ref(false)
const badge2Hovered = ref(false)

// Simulate live counter
onMounted(() => {
  setInterval(() => {
    userCount.value += Math.floor(Math.random() * 3)
  }, 2000)

  initBinanceStream()
})

onUnmounted(() => {
  if (ws.value) ws.value.close()
})

// Coins Data Configuration
const popularCoins = ref([
  { symbol: 'BTC', name: 'Bitcoin', price: 0, change: 0, icon: 'bitcoin-icon.png', pair: 'BTCUSDT' },
  { symbol: 'ETH', name: 'Ethereum', price: 0, change: 0, icon: 'ethereum-icon.png', pair: 'ETHUSDT' },
  { symbol: 'BNB', name: 'BNB', price: 0, change: 0, icon: 'bnb-icon.png', pair: 'BNBUSDT' },
  { symbol: 'XRP', name: 'XRP', price: 0, change: 0, icon: 'xrp-icon.png', pair: 'XRPUSDT' },
  { symbol: 'SOL', name: 'Solana', price: 0, change: 0, icon: 'SOL-icon.png', pair: 'SOLUSDT' },
])

const newListingCoins = ref([
  { symbol: 'TRUMP', name: 'Official Trump', price: 0, change: 0, icon: 'TRUMP-icon.png', pair: 'TRUMPUSDT' },
  { symbol: 'SUI', name: 'Sui', price: 0, change: 0, icon: 'SUI-icon.png', pair: 'SUIUSDT' },
  { symbol: 'PEPE', name: 'Pepe', price: 0, change: 0, icon: 'PEPE-icon.png', pair: 'PEPEUSDT' },
  { symbol: 'WLD', name: 'Worldcoin', price: 0, change: 0, icon: 'WLD-icon.png', pair: 'WLDUSDT' },
  { symbol: 'AVAX', name: 'Avalanche', price: 0, change: 0, icon: 'AVAX-icon.png', pair: 'AVAXUSDT' }
])

// Computed property to switch lists
const activeList = computed(() => {
  return activeTab.value === 'popular' ? popularCoins.value : newListingCoins.value
})

const initBinanceStream = () => {
  // Combine all streams we need
  const streams = [
    ...popularCoins.value.map(c => `${c.pair.toLowerCase()}@ticker`),
    ...newListingCoins.value.map(c => `${c.pair.toLowerCase()}@ticker`)
  ].join('/')

  ws.value = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`)

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    updateCoinData(data)
  }
}

const updateCoinData = (data) => {
  // Update Popular List
  const popIndex = popularCoins.value.findIndex(c => c.pair === data.s)
  if (popIndex !== -1) {
    popularCoins.value[popIndex].price = parseFloat(data.c)
    popularCoins.value[popIndex].change = parseFloat(data.P)
  }

  // Update New Listing List
  const newIndex = newListingCoins.value.findIndex(c => c.pair === data.s)
  if (newIndex !== -1) {
    newListingCoins.value[newIndex].price = parseFloat(data.c)
    newListingCoins.value[newIndex].change = parseFloat(data.P)
  }
}

const goToTrade = (coin) => {
  router.push(`/trade/${coin.symbol}_USDT`)
}

const handleViewAll = () => {
  if (isLoggedIn.value) {
    router.push('/markets')
  } else {
    router.push({ path: '/login', query: { redirect: '/markets' } })
  }
}

// Formatting Helpers
const formatPrice = (val) => {
  if (!val) return 'Loading...'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
}

const formatChange = (val) => {
  if (!val) return '0.00%'
  return (val > 0 ? '+' : '') + val.toFixed(2) + '%'
}

const newsItems = [
  "White House Economic Advisor Calls for Further Fed Rate Cuts",
  "Bitcoin(BTC) Surpasses 91,000 USDT with a 0.70% Increase in 24 Hours",
  "Tether Invests in Bitcoin-Backed Lending Firm Ledn",
  "Bitcoin Market Analysis Suggests Caution Amid Increased Demand for Downside Protection"
]
</script>

<style scoped>
.text-error {
  color: #F6465D;
  /* Binance Standard Red */
}
</style>

<template>
  <div class="pt-[64px] bg-bg-base flex justify-center">
    <div class="max-w-[1248px] w-full px-6 pt-4 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

      <!-- Left Column: Hero Text & CTA -->
      <div class="lg:col-span-7 flex flex-col justify-start pt-2">

        <!-- User Count - Dynamic Feel -->
        <h1
          class="text-[64px] leading-[72px] font-extrabold text-[color:var(--color-primary-bright)] mb-4 font-binance tracking-tight">
          {{ userCount.toLocaleString() }}
          <br />
          <span class="text-text-primary">USERS</span>
          <br />
          <span class="text-text-primary">TRUST US</span>
        </h1>

        <p class="text-[20px] text-text-primary font-medium mb-10">
          The World's Leading Cryptocurrency Exchange
        </p>

        <!-- Trust Badges - Interactive with Hover -->
        <div class="flex gap-6 mb-12">
          <!-- Badge 1: Customer Assets -->
          <div @mouseenter="badge1Hovered = true" @mouseleave="badge1Hovered = false"
            class="relative cursor-pointer group">
            <div class="flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300"
              :class="badge1Hovered ? 'bg-bg-card' : 'bg-transparent'">
              <!-- Left Laurel -->
              <img src="/svg/left.svg" alt="" class="w-5 h-11" />

              <div class="relative min-w-[140px]">
                <!-- Default State -->
                <div class="transition-all duration-300" :class="badge1Hovered ? 'opacity-0 absolute' : 'opacity-100'">
                  <div class="text-[16px] font-bold text-primary">No.1</div>
                  <div class="text-[12px] text-text-primary whitespace-nowrap">Customer Assets</div>
                </div>
                <!-- Hover State -->
                <div class="transition-all duration-300" :class="badge1Hovered ? 'opacity-100' : 'opacity-0 absolute'">
                  <div class="text-[11px] text-text-primary whitespace-nowrap">Assets</div>
                  <div class="text-[14px] font-bold text-primary whitespace-nowrap">$181,752,842,852</div>
                </div>
              </div>

              <!-- Right Laurel -->
              <img src="/svg/left.svg" alt="" class="w-5 h-11 transform scale-x-[-1]" />
            </div>
          </div>

          <!-- Badge 2: Trading Volume -->
          <div @mouseenter="badge2Hovered = true" @mouseleave="badge2Hovered = false"
            class="relative cursor-pointer group">
            <div class="flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300"
              :class="badge2Hovered ? 'bg-bg-card' : 'bg-transparent'">
              <!-- Left Laurel -->
              <img src="/svg/left.svg" alt="" class="w-5 h-11" />

              <div class="relative min-w-[140px]">
                <!-- Default State -->
                <div class="transition-all duration-300" :class="badge2Hovered ? 'opacity-0 absolute' : 'opacity-100'">
                  <div class="text-[16px] font-bold text-primary">No.1</div>
                  <div class="text-[12px] text-text-primary whitespace-nowrap">Trading Volume</div>
                </div>
                <!-- Hover State -->
                <div class="transition-all duration-300" :class="badge2Hovered ? 'opacity-100' : 'opacity-0 absolute'">
                  <div class="text-[11px] text-text-primary whitespace-nowrap">24H</div>
                  <div class="text-[14px] font-bold text-primary whitespace-nowrap">$49,919,667,461</div>
                </div>
              </div>

              <!-- Right Laurel -->
              <img src="/svg/left.svg" alt="" class="w-5 h-11 transform scale-x-[-1]" />
            </div>
          </div>
        </div>

        <!-- Sign Up Row -->
        <div class="flex flex-col sm:flex-row gap-4 max-w-[580px] mb-12">
          <div class="flex-1 relative w-full">
            <input type="text" placeholder="Email/Phone number"
              class="w-full h-[48px] bg-bg-base border border-bg-card-hover rounded-[8px] pl-4 text-text-primary focus:border-primary focus:outline-none placeholder-text-disabled hover:border-text-secondary transition-colors" />
            <div
              class="hidden sm:flex absolute right-0 top-0 bottom-0 px-4 items-center bg-gradient-to-l from-bg-base to-transparent pointer-events-none">
              <span class="text-primary text-xs flex items-center gap-1 whitespace-nowrap">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 13h2v2H9v-2zm0-8h2v6H9V5z" />
                </svg>
                Up to $100 Bonus
              </span>
            </div>
          </div>
          <router-link to="/register"
            class="h-[48px] px-8 bg-primary hover:bg-primary-hover text-black font-bold rounded-[8px] transition-colors whitespace-nowrap flex items-center justify-center w-full sm:w-auto">
            Sign Up
          </router-link>
        </div>

        <!-- Social / Download -->
        <div class="flex gap-4">
          <router-link to="/register"
            class="w-10 h-10 rounded-full bg-bg-card hover:bg-bg-hover flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
            </svg>
          </router-link>
          <router-link to="/register"
            class="w-10 h-10 rounded-full bg-bg-card hover:bg-bg-hover flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.79-.93 1.05-.01 2.37.56 2.9 1.35-3.77 1.94-2.88 5.76.51 7.15-.35 1.76-1.57 3.74-2.28 4.66ZM12.03 5.33c-.05-2.45 2.15-4.34 4.54-4.33.25 2.87-2.92 4.41-4.54 4.33Z" />
            </svg>
          </router-link>
          <router-link to="/login"
            class="w-10 h-10 rounded-full bg-bg-card hover:bg-bg-hover flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24">
              <path d="M4 4h4v4H4zM16 4h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4zM9 9h6v6H9z" />
            </svg>
          </router-link>
        </div>

      </div>

      <!-- Right Column: Markets & News -->
      <div class="lg:col-span-5 flex flex-col gap-6 pt-2">

        <!-- Markets Card -->
        <div class="bg-bg-card rounded-[16px] p-4 min-h-[420px]">
          <div class="flex items-center justify-between mb-4 px-2">
            <div class="flex gap-6">
              <button class="text-[16px] font-medium transition-colors border-b-2 pb-1"
                :class="activeTab === 'popular' ? 'text-text-primary border-primary' : 'text-text-secondary border-transparent hover:text-text-primary'"
                @click="activeTab = 'popular'">
                Popular
              </button>
              <button class="text-[16px] font-medium transition-colors border-b-2 pb-1"
                :class="activeTab === 'new' ? 'text-text-primary border-primary' : 'text-text-secondary border-transparent hover:text-text-primary'"
                @click="activeTab = 'new'">
                New Listing
              </button>
            </div>
            <button @click="handleViewAll"
              class="text-xs text-text-secondary hover:text-primary flex items-center gap-1">
              View All 350+ Coins <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div class="flex flex-col">
            <div v-for="coin in activeList" :key="coin.symbol" @click="goToTrade(coin)"
              class="flex items-center justify-between py-3 px-2 hover:bg-bg-hover rounded-lg cursor-pointer transition-colors group">
              <div class="flex items-center gap-3">
                <!-- Coin Icon -->
                <img :src="`/coin-icons/${coin.icon}`" :alt="coin.name" class="w-8 h-8 rounded-full" />
                <div>
                  <span class="text-sm font-medium text-text-primary group-hover:text-primary">{{ coin.symbol }}</span>
                  <span class="text-xs text-text-secondary ml-1">{{ coin.name }}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-text-primary font-medium">{{ formatPrice(coin.price) }}</div>
                <div class="text-xs" :class="coin.change >= 0 ? 'text-success' : 'text-error'">
                  {{ formatChange(coin.change) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- News Card -->
        <div class="bg-bg-card rounded-[16px] p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-text-primary font-medium">News</h3>
            <a href="#" class="text-xs text-text-secondary hover:text-primary flex items-center gap-1">
              View All News <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </div>

          <div class="space-y-4">
            <a href="#" v-for="(news, index) in newsItems" :key="index"
              class="block text-sm text-text-primary hover:text-primary transition-colors leading-snug">
              {{ news }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
