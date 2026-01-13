<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('popular')
const userCount = ref(303851303)

// Simulate live counter
onMounted(() => {
  setInterval(() => {
    userCount.value += Math.floor(Math.random() * 3)
  }, 2000)
})

const popularCoins = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$91,783.31', change: '+1.19%' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,145.06', change: '+1.49%' },
  { symbol: 'BNB', name: 'BNB', price: '$900.87', change: '+1.46%' },
  { symbol: 'XRP', name: 'XRP', price: '$2.14', change: '+0.77%' },
  { symbol: 'ASTER', name: 'Aster', price: '$0.722', change: '+0.84%' },
]

const newsItems = [
  "White House Economic Advisor Calls for Further Fed Rate Cuts",
  "Bitcoin(BTC) Surpasses 91,000 USDT with a 0.70% Increase in 24 Hours",
  "Tether Invests in Bitcoin-Backed Lending Firm Ledn",
  "Bitcoin Market Analysis Suggests Caution Amid Increased Demand for Downside Protection"
]
</script>

<template>
  <div class="pt-[64px] min-h-screen bg-bg-base flex justify-center">
    <div class="max-w-[1248px] w-full px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">

      <!-- Left Column: Hero Text & CTA -->
      <div class="lg:col-span-7 flex flex-col justify-center pt-8">

        <!-- User Count - Dynamic Feel -->
        <h1
          class="text-[64px] leading-[72px] font-bold text-[color:var(--color-primary-bright)] mb-4 font-binance tracking-tight">
          {{ userCount.toLocaleString() }}
          <br />
          <span class="text-text-primary">USERS</span>
          <br />
          <span class="text-text-primary">TRUST US</span>
        </h1>

        <p class="text-[20px] text-text-primary font-medium mb-10">
          The World's Leading Cryptocurrency Exchange
        </p>

        <!-- Trust Badges -->
        <div class="flex gap-12 mb-12">
          <div class="flex items-center gap-3">
            <div class="text-primary">
              <!-- Laurel Icon -->
              <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor">
                <path d="M2,20 Q0,10 10,0 M22,20 Q24,10 14,0 M2,20 Q0,30 10,40 M22,20 Q24,30 14,40" fill="none"
                  stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <div>
              <div class="text-[16px] font-bold text-primary">No.1</div>
              <div class="text-[12px] text-text-primary">Customer Assets</div>
            </div>
            <div class="text-primary transform scale-x-[-1]">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor">
                <path d="M2,20 Q0,10 10,0 M22,20 Q24,10 14,0 M2,20 Q0,30 10,40 M22,20 Q24,30 14,40" fill="none"
                  stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-primary">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor">
                <path d="M2,20 Q0,10 10,0 M22,20 Q24,10 14,0 M2,20 Q0,30 10,40 M22,20 Q24,30 14,40" fill="none"
                  stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <div>
              <div class="text-[16px] font-bold text-primary">No.1</div>
              <div class="text-[12px] text-text-primary">Trading Volume</div>
            </div>
            <div class="text-primary transform scale-x-[-1]">
              <svg width="24" height="40" viewBox="0 0 24 40" fill="currentColor">
                <path d="M2,20 Q0,10 10,0 M22,20 Q24,10 14,0 M2,20 Q0,30 10,40 M22,20 Q24,30 14,40" fill="none"
                  stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Sign Up Row -->
        <div class="flex gap-4 max-w-[580px] mb-12">
          <div class="flex-1 relative">
            <input type="text" placeholder="Email/Phone number"
              class="w-full h-[48px] bg-bg-base border border-bg-card-hover rounded-[8px] pl-4 text-text-primary focus:border-primary focus:outline-none placeholder-text-disabled hover:border-text-secondary transition-colors" />
            <div
              class="absolute right-0 top-0 bottom-0 px-4 flex items-center bg-gradient-to-l from-bg-base to-transparent">
              <span class="text-primary text-xs flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 13h2v2H9v-2zm0-8h2v6H9V5z" />
                </svg>
                Up to $100 Bonus Only Today
              </span>
            </div>
          </div>
          <router-link to="/register"
            class="h-[48px] px-8 bg-primary hover:bg-primary-hover text-black font-bold rounded-[8px] transition-colors whitespace-nowrap flex items-center justify-center">
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
      <div class="lg:col-span-5 flex flex-col gap-6 pt-12">

        <!-- Markets Card -->
        <div class="bg-bg-card rounded-[16px] p-4">
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
            <a href="#" class="text-xs text-text-secondary hover:text-primary flex items-center gap-1">
              View All 350+ Coins <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </div>

          <div class="flex flex-col">
            <div v-for="coin in popularCoins" :key="coin.symbol"
              class="flex items-center justify-between py-3 px-2 hover:bg-bg-hover rounded-lg cursor-pointer transition-colors group">
              <div class="flex items-center gap-3">
                <!-- Coin Icon Placeholder -->
                <div
                  class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                  {{ coin.symbol[0] }}
                </div>
                <div>
                  <span class="text-sm font-medium text-text-primary group-hover:text-primary">{{ coin.symbol }}</span>
                  <span class="text-xs text-text-secondary ml-1">{{ coin.name }}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-text-primary font-medium">{{ coin.price }}</div>
                <div class="text-xs text-success">{{ coin.change }}</div>
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
