<script setup>
const paths = [
    {
        title: 'Beginner Guide to Crypto',
        modules: 5,
        desc: 'The essential foundation for everyone starting their digital asset journey.',
        icon: '🌱'
    },
    {
        title: 'Web3 & Decentralization',
        modules: 8,
        desc: 'Deep dive into the technology powering the future of the internet.',
        icon: '🌐'
    },
    {
        title: 'Trading 101: Master the Charts',
        modules: 12,
        desc: 'Learn the core principles of price action and technical analysis.',
        icon: '📊'
    }
]
</script>

<template>
    <div class="space-y-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-4">
                <h2 class="text-[32px] font-bold">Learning Paths</h2>
                <p class="text-gray-500 max-w-xl text-[16px]">Step-by-step educational journeys designed to take you
                    from a curious beginner to a confident expert.</p>
            </div>
            <button
                class="bg-black text-white px-8 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-800 transition-colors">
                View All Paths
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div v-for="p in paths" :key="p.title"
                class="group bg-white border border-gray-100 rounded-3xl p-10 hover:border-[#FCD535]/30 hover:shadow-xl hover:shadow-[#FCD535]/5 transition-all cursor-pointer">
                <div
                    class="w-20 h-20 rounded-[24px] bg-[#FCD535]/5 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">
                    {{ p.icon }}
                </div>
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-[#F0B90B] font-bold text-[12px]">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                stroke-width="2.5" />
                        </svg>
                        {{ p.modules }} MODULES
                    </div>
                    <h3 class="text-[24px] font-bold leading-tight group-hover:text-black">{{ p.title }}</h3>
                    <p class="text-gray-500 text-[15px] leading-relaxed line-clamp-2">
                        {{ p.desc }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
