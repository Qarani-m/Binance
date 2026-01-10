<script setup>
import { ref } from 'vue'

const activeType = ref('Criteria')
const activeProgram = ref('Trader')

const programs = ['Trader Program', 'Holder Program', 'Borrower Program', 'Investor Program']

const traderLevels = [
    { level: 'VIP 1', volume: '≥ 1,000,000 USD', bnb: '≥ 25 BNB' },
    { level: 'VIP 2', volume: '≥ 5,000,000 USD', bnb: '≥ 100 BNB' },
    { level: 'VIP 3', volume: '≥ 20,000,000 USD', bnb: '≥ 250 BNB' },
    { level: 'VIP 4', volume: '≥ 75,000,000 USD', bnb: '≥ 500 BNB' },
    { level: 'VIP 5', volume: '≥ 150,000,000 USD', bnb: '≥ 1,000 BNB', active: true },
    { level: 'VIP 6', volume: '≥ 400,000,000 USD', bnb: '≥ 1,750 BNB' },
    { level: 'VIP 7', volume: '≥ 800,000,000 USD', bnb: '≥ 3,000 BNB' },
    { level: 'VIP 8', volume: '≥ 2,000,000,000 USD', bnb: '≥ 4,500 BNB' },
    { level: 'VIP 9', volume: '≥ 4,000,000,000 USD', bnb: '≥ 5,500 BNB' }
]
</script>

<template>
    <div class="py-32 bg-black">
        <div class="max-w-[1280px] mx-auto px-8 lg:px-24">
            <div class="text-center space-y-6 mb-16">
                <h2 class="text-[32px] md:text-[44px] font-bold text-white uppercase tracking-tight">
                    Unlocking Binance VIP Status
                </h2>
                <p class="text-[#848E9C] text-[16px]">Fulfill the requirements below to join Binance VIP and access
                    exclusive perks.</p>

                <!-- Toggle -->
                <div class="flex items-center justify-center pt-4">
                    <div class="bg-[#1E2329] p-1 rounded-lg flex">
                        <button v-for="type in ['VIP Criteria', 'VIP Trading Fee']" :key="type"
                            @click="activeType = type" class="px-8 py-2 rounded-md text-[14px] font-bold transition-all"
                            :class="activeType === type ? 'bg-[#FCD535] text-black' : 'text-[#848E9C] hover:text-white'">
                            {{ type }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs -->
            <div class="flex flex-wrap justify-center border-b border-[#2B3139] mb-12">
                <button v-for="p in programs" :key="p" @click="activeProgram = p.split(' ')[0]"
                    class="px-8 py-4 text-[15px] font-bold relative transition-colors"
                    :class="activeProgram === p.split(' ')[0] ? 'text-white' : 'text-[#848E9C] hover:text-white'">
                    {{ p }}
                    <div v-if="activeProgram === p.split(' ')[0]"
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FCD535] rounded-t-full"></div>
                </button>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-[14px]">
                    <thead>
                        <tr class="text-left text-[#848E9C] border-b border-[#2B3139]">
                            <th class="pb-6 font-normal">VIP Level</th>
                            <th class="pb-6 font-normal">30-Day Trade Volume (USD)</th>
                            <th class="pb-6 font-normal">And/Or</th>
                            <th class="pb-6 font-normal">BNB Balance</th>
                        </tr>
                    </thead>
                    <tbody class="text-white">
                        <tr v-for="row in traderLevels" :key="row.level" class="group transition-colors"
                            :class="row.active ? 'bg-[#1E2329]' : 'hover:bg-[#181A20]'">
                            <td class="py-5 font-bold">{{ row.level }}</td>
                            <td class="py-5">{{ row.volume }}</td>
                            <td class="py-5 text-[#848E9C]">And</td>
                            <td class="py-5">{{ row.bnb }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="text-center mt-12">
                <button
                    class="text-[#848E9C] hover:text-[#FCD535] text-[14px] font-medium underline underline-offset-4">
                    View All Information
                </button>
            </div>
        </div>
    </div>
</template>
