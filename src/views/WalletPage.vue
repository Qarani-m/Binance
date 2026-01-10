<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import WalletHero from '@/components/wallet/WalletHero.vue'
import WalletFeatures from '@/components/wallet/WalletFeatures.vue'
import WalletCampaigns from '@/components/wallet/WalletCampaigns.vue'
import WalletFAQ from '@/components/wallet/WalletFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white text-[#1E2329]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <WalletHero />
            <WalletFeatures />
            <WalletCampaigns />
            <WalletFAQ />

            <!-- Disclaimer Footer Section -->
            <div class="max-w-[1280px] mx-auto px-6 py-12 border-t border-gray-100">
                <p class="text-[11px] text-[#848E9C] leading-relaxed">
                    Disclaimer: Binance Wallet is a self-custody crypto wallet which also serves as a digital gateway to
                    third-party blockchain-based applications. The Binance Wallet Services are provided by Binance
                    Barbados Limited. The Binance Wallet Services are not under the supervision of the Financial
                    Services Regulatory Authority or any other regulatory authority. For more information, please
                    consult the <span class="text-[#F0B90B] cursor-pointer">Binance Wallet Terms of Use</span> and <span
                        class="text-[#F0B90B] cursor-pointer">Risk Warning</span>.
                </p>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
