<script setup>
const projects = [
    {
        name: 'BREV',
        type: 'HODLer Airdrops',
        amount: '15,000,000 BREV',
        perBnb: '0.9335 BREV',
        price: '≈ $0.35483',
        color: 'bg-yellow-500',
        icon: 'B',
        stats: '82.4K+ Participants'
    },
    {
        name: 'AT',
        type: 'HODLer Airdrops',
        amount: '20,000,000 AT',
        perBnb: '1.2165 AT',
        price: '≈ $0.19768',
        color: 'bg-green-500',
        icon: 'A',
        stats: '150K+ Participants'
    },
    {
        name: 'ALLO',
        type: 'HODLer Airdrops',
        amount: '15,000,000 ALLO',
        perBnb: '0.9108 ALLO',
        price: '≈ $0.10246',
        color: 'bg-white',
        icon: 'Al',
        stats: '95K+ Participants'
    },
    {
        name: 'SAPIEN',
        type: 'HODLer Airdrops',
        amount: '15,000,000 SAPIEN',
        perBnb: '0.9121 SAPIEN',
        price: '≈ $0.12569',
        color: 'bg-blue-500',
        icon: 'S',
        stats: '210K+ Participants'
    }
]
</script>

<template>
    <div class="py-24 bg-black">
        <div class="max-w-[1280px] mx-auto px-6">
            <div class="flex items-center justify-between mb-12">
                <h2 class="text-[32px] font-bold text-white uppercase tracking-wider">Completed Projects</h2>
                <div class="h-px flex-1 bg-gradient-to-r from-[#2B3139] to-transparent ml-8"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="p in projects" :key="p.name"
                    class="group relative bg-[#181A20] border border-[#2B3139] rounded-[24px] p-8 transition-all hover:bg-[#1E2329] hover:border-[#FCD535]/30 overflow-hidden">

                    <!-- Subtle Glow -->
                    <div
                        class="absolute -right-20 -top-20 w-40 h-40 bg-[#FCD535] opacity-0 blur-[80px] group-hover:opacity-10 transition-opacity">
                    </div>

                    <div class="flex justify-between items-start relative z-10">
                        <div class="flex items-center gap-6">
                            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-xl transition-transform group-hover:scale-110"
                                :class="p.color">
                                {{ p.icon }}
                            </div>
                            <div>
                                <div class="flex items-center gap-3">
                                    <span class="text-[24px] font-bold text-white">{{ p.name }}</span>
                                    <span
                                        class="text-[11px] font-bold text-[#00D18E] border border-[#00D18E]/30 px-2 py-0.5 rounded uppercase tracking-tighter">Distributed</span>
                                </div>
                                <p class="text-[#848E9C] text-[14px] font-medium">{{ p.type }}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-white font-bold text-[18px]">{{ p.amount }}</p>
                            <p class="text-[#848E9C] text-[12px]">{{ p.stats }}</p>
                        </div>
                    </div>

                    <div class="mt-10 pt-8 border-t border-[#2B3139] flex justify-between items-end relative z-10">
                        <div class="space-y-4">
                            <p class="text-[#848E9C] text-[12px] font-bold tracking-widest uppercase">Average Airdrop
                            </p>
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-5 h-5 bg-[#FCD535] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(252,213,53,0.3)]">
                                    <div class="w-2.5 h-0.5 bg-black"></div>
                                </div>
                                <span class="text-white text-[16px] font-bold">Per BNB</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-[#FCD535] text-[24px] font-black tracking-tight">{{ p.perBnb }}</p>
                            <p class="text-[#848E9C] text-[14px] font-medium">{{ p.price }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-16">
                <button
                    class="bg-[#1E2329] hover:bg-[#2B3139] text-white font-bold px-10 py-3 rounded-xl transition-all border border-[#2B3139] hover:border-[#FCD535]/30">
                    Explore All Projects
                </button>
            </div>
        </div>
    </div>
</template>
