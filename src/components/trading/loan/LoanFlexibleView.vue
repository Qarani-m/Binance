<script setup>
const products = [
    { symbol: 'BTC', name: 'BTC', hourly: '0.000058%', annual: '0.506383%', color: '#F7931A' },
    { symbol: 'ETH', name: 'ETH', hourly: '0.000286%', annual: '2.503958%', color: '#627EEA' },
    { symbol: 'USDT', name: 'USDT', hourly: '0.000537%', annual: '4.701597%', color: '#00A36C' },
    { symbol: 'XRP', name: 'XRP', hourly: '0.000569%', annual: '4.987629%', color: '#23292F' },
    { symbol: 'SOL', name: 'SOL', hourly: '0.000723%', annual: '6.331644%', color: '#00FFA3' },
    { symbol: 'USDC', name: 'USDC', hourly: '0.000614%', annual: '5.376152%', color: '#2775CA' },
    { symbol: 'TRX', name: 'TRX', hourly: '0.000778%', annual: '6.817663%', color: '#FF0013' },
    { symbol: 'DOGE', name: 'DOGE', hourly: '0.000483%', annual: '4.226718%', color: '#C2A633' },
]
</script>

<template>
    <div class="max-w-[1280px] mx-auto px-6 pb-20">
        <!-- Hero Section -->
        <div class="flex gap-12 mb-16">
            <div class="flex-1">
                <h2 class="text-[#FCD535] text-[20px] font-bold mb-4 uppercase tracking-wide">Flexible Rate Loan</h2>
                <h1 class="text-[36px] font-bold text-white mb-6 leading-tight">
                    Borrow for Spot/Margin/Futures<br>Trading or staking to earn high APY.
                </h1>
                <div class="space-y-3 mb-10">
                    <div class="flex items-center gap-3 text-[13px] text-[#848E9C]">
                        <span class="w-4 h-4 text-[#FCD535]">⏱</span> Repay at any time
                    </div>
                    <div class="flex items-center gap-3 text-[13px] text-[#848E9C]">
                        <span class="w-4 h-4 text-[#FCD535]">💸</span> No transaction fee
                    </div>
                    <div class="flex items-center gap-3 text-[13px] text-[#848E9C]">
                        <span class="w-4 h-4 text-[#FCD535]">🛡</span> Simple Earn (Flexible) assets can be
                        collateralized in Flexible Loan >
                    </div>
                </div>
                <button class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-12 py-3 rounded text-[16px]">
                    Borrow Now
                </button>
            </div>

            <div class="w-[450px] space-y-4">
                <!-- Side Card 1 -->
                <div
                    class="bg-[#1E2329] border border-[#2B3139] rounded-lg p-6 flex justify-between items-center group cursor-pointer hover:border-[#FCD535] transition-colors">
                    <div>
                        <h3 class="text-white font-bold text-[14px] mb-2">Fixed Rate Loans</h3>
                        <p class="text-[12px] text-[#848E9C] max-w-[200px] mb-3">Create a borrow request or supply order
                            with your preferred amount and interest rate.</p>
                        <span class="text-[#FCD535] text-[12px] font-medium">Explore Now</span>
                    </div>
                    <div class="w-20 h-20 relative bg-[#2B3139] rounded-full flex items-center justify-center">
                        <div class="text-[40px]">💰</div>
                    </div>
                </div>
                <!-- Side Card 2 -->
                <div
                    class="bg-[#1E2329] border border-[#2B3139] rounded-lg p-6 flex justify-between items-center group cursor-pointer hover:border-[#FCD535] transition-colors">
                    <div>
                        <h3 class="text-white font-bold text-[14px] mb-2">VIP Loan</h3>
                        <p class="text-[12px] text-[#848E9C] max-w-[200px] mb-3">Institutional Level Loan Services for
                            VIP users</p>
                        <span class="text-[#FCD535] text-[12px] font-medium">Explore Now</span>
                    </div>
                    <div class="w-20 h-20 relative bg-[#2B3139] rounded-full flex items-center justify-center">
                        <div class="text-[40px]">🏦</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Borrow Market -->
        <div class="mb-10 flex items-center justify-between">
            <h2 class="text-[24px] font-bold text-white">Borrow Market</h2>
            <div class="max-w-[300px] w-full relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                </svg>
                <input type="text" placeholder="Search"
                    class="w-full bg-[#181A20] rounded pl-10 pr-4 py-1.5 text-[13px] border border-[#2B3139] outline-none text-white">
            </div>
        </div>

        <div class="w-full">
            <div
                class="grid grid-cols-[2fr_1fr_1fr_100px] px-2 py-4 text-[11px] text-[#848E9C] border-b border-[#2B3139]">
                <div>Loanable Coin</div>
                <div class="flex items-center gap-1">Hourly Interest Rate <svg class="w-3 h-3" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg></div>
                <div class="flex items-center gap-1">Annually Interest Rate <svg class="w-3 h-3" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg></div>
                <div class="text-right">Action</div>
            </div>

            <div v-for="p in products" :key="p.symbol"
                class="grid grid-cols-[2fr_1fr_1fr_100px] px-2 py-6 items-center text-[13px] border-b border-[#2B3139] hover:bg-[#181A20] transition-colors cursor-pointer group">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        :style="{ backgroundColor: p.color }">
                        {{ p.symbol[0] }}
                    </div>
                    <span class="text-white font-bold">{{ p.symbol }}</span>
                </div>
                <div class="text-white">{{ p.hourly }}</div>
                <div class="text-white">{{ p.annual }}</div>
                <div class="text-right">
                    <button class="text-[#FCD535] hover:underline font-medium">Borrow</button>
                </div>
            </div>
        </div>
    </div>
</template>
