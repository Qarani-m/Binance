<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tabs = ['Overview', 'Simple Earn', 'Advanced Earn', 'Loan']
const activeTab = ref('Overview')

const slides = [
    {
        image: '/images/binance_simple_earn.jpg',
        title: 'BINANCE SIMPLE EARN',
        promo: 'LOCKED PRODUCTS: SKY & PLUME',
        apr: '12.75% APR*',
        bg: '#1E2329'
    },
    {
        image: '/images/Hodler_airdrops.jpg',
        title: 'HODLER AIRDROPS',
        promo: 'STAKE BNB & GET REWARDS',
        apr: 'EXCLUSIVE ACCESS',
        bg: '#1E2329'
    }
]

const currentSlide = ref(0)
let timer = null

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => {
    timer = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<template>
    <section class="bg-[#181A20] pt-4 select-none">
        <!-- Secondary Nav Tabs -->
        <div class="max-w-[1280px] mx-auto px-6 flex gap-8 items-center h-12 border-b border-[#2B3139]">
            <div v-for="tab in tabs" :key="tab"
                class="h-full flex items-center gap-1 cursor-pointer transition-colors relative"
                @click="activeTab = tab">
                <span class="text-[14px] font-medium transition-colors"
                    :class="activeTab === tab ? 'text-white' : 'text-[#848E9C] hover:text-white'">
                    {{ tab }}
                </span>
                <svg v-if="tab === 'Simple Earn' || tab === 'Advanced Earn'" class="w-3 h-3 text-[#848E9C]" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Hero Content & Slider -->
        <div class="max-w-[1280px] mx-auto px-6 py-16 flex gap-12">
            <!-- Left Column -->
            <div class="flex-1 flex flex-col justify-center">
                <h1 class="text-[52px] font-bold text-white leading-tight mb-4 tracking-tight">Binance Earn</h1>
                <p class="text-[16px] text-[#848E9C] mb-8">Smart Earning Starts Here – 300+ Crypto Assets Supported</p>
                <router-link to="/login"
                    class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-2.5 rounded text-[14px] w-fit flex items-center justify-center">
                    Log In
                </router-link>
            </div>

            <!-- Right Column: Slider -->
            <div
                class="w-[480px] h-[320px] relative rounded-lg overflow-hidden border border-[#2B3139] bg-[#1E2329] group">
                <div class="absolute inset-0 transition-opacity duration-700 flex flex-col p-8"
                    v-for="(slide, index) in slides" :key="index"
                    :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'">

                    <div class="flex justify-between items-start mb-6">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 bg-[#FCD535] rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <span class="text-white text-[14px] font-bold uppercase">{{ slide.title }}</span>
                        </div>
                        <span class="bg-[#FCD535] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                    </div>

                    <div class="flex-1 flex flex-col justify-center">
                        <h3 class="text-[20px] text-[#848E9C] font-semibold mb-2">{{ slide.promo }}</h3>
                        <div class="text-[32px] font-bold text-white mb-6">ENJOY UP TO <span class="text-[#FCD535]">{{
                            slide.apr }}</span></div>
                        <button
                            class="bg-white hover:bg-white/90 text-black font-bold px-6 py-2 rounded-md w-fit text-[14px]">SUBSCRIBE</button>
                    </div>

                    <!-- Pagination -->
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        <div v-for="(_, i) in slides" :key="i"
                            class="w-2 h-2 rounded-full cursor-pointer transition-all"
                            :class="currentSlide === i ? 'bg-white w-4' : 'bg-gray-600'" @click="currentSlide = i">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
