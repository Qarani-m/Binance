<script setup>
const topics = [
    { name: 'Bitcoin', icon: '₿', color: '#F7931A' },
    { name: 'Blockchain', icon: '🔗', color: '#2C3E50' },
    { name: 'Altcoins', icon: '🌑', color: '#3498DB' },
    { name: 'Security', icon: '🛡️', color: '#27AE60' },
    { name: 'Defi', icon: '🏦', color: '#9B59B6' },
    { name: 'NFT', icon: '🎨', color: '#E67E22' },
    { name: 'Trading', icon: '📈', color: '#E74C3C' },
    { name: 'GameFi', icon: '🎮', color: '#2ECC71' }
]
</script>

<template>
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <h2 class="text-[24px] font-bold">Explore Topics</h2>
            <button class="text-[14px] text-gray-500 hover:text-black font-medium">View All Topics</button>
        </div>

        <div class="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
            <div v-for="t in topics" :key="t.name"
                class="flex-shrink-0 flex flex-col items-center gap-4 group cursor-pointer w-28">
                <div
                    class="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 group-hover:shadow-md transition-all">
                    {{ t.icon }}
                </div>
                <span class="text-[14px] font-bold text-gray-700 group-hover:text-black">{{ t.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
