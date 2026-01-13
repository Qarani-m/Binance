<script setup>
const navItems = [
    { name: 'Crypto Security', icon: '🔒' },
    { name: 'Courses', icon: '📋' },
    { name: 'Learn & Earn', icon: '💰' },
    { name: 'Product Guides', icon: '📋' },
    { name: 'Learn BTC', icon: '₿' }
]

const suggested = [
    { title: 'The Psychology of Market Cycles', icon: '📈' },
    { title: 'What is Bitcoin and How Does It Work?', icon: '₿' },
    { title: 'What is Crypto Market Sentiment?', icon: '📊' },
    { title: "Binance Beginner's Guide", icon: '🎓' }
]
</script>

<template>
    <div class="py-12 bg-[#181A20]">
        <div class="max-w-[1280px] mx-auto px-6 space-y-16">

            <!-- Quick Nav Cards -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div v-for="item in navItems" :key="item.name"
                    class="bg-[#1E2329] border border-[#2B3139] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-[#2B3139] transition-all group">
                    <div class="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{{ item.icon }}</div>
                    <span class="text-white font-bold text-[14px]">{{ item.name }}</span>
                </div>
            </div>

            <!-- Suggested Section -->
            <div class="space-y-8">
                <h3 class="text-[#848E9C] text-[14px] font-medium font-bold">Suggested</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="item in suggested" :key="item.title"
                        class="bg-[#1E2329] border border-[#2B3139] rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-[#FCD535]/30 transition-all">
                        <span class="text-white text-[14px] font-bold line-clamp-2 leading-tight">{{ item.title
                            }}</span>
                        <div class="w-12 h-12 rounded-lg bg-black flex items-center justify-center shrink-0">
                            <span class="text-xl">{{ item.icon }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
