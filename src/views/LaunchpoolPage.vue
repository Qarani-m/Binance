<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LaunchpoolHero from '@/components/launchpool/LaunchpoolHero.vue'
import LaunchpoolGrid from '@/components/launchpool/LaunchpoolGrid.vue'
import LaunchpoolFAQ from '@/components/launchpool/LaunchpoolFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-black text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <LaunchpoolHero />
            <LaunchpoolGrid />
            <LaunchpoolFAQ />

            <!-- Bottom Links -->
            <div class="max-w-[1280px] mx-auto px-4 md:px-6 pb-20 text-center">
                <p class="text-[12px] text-[#848E9C]">
                    * By participating, you agree to the <span class="text-[#F0B90B] cursor-pointer">Terms and
                        Conditions</span> and <span class="text-[#F0B90B] cursor-pointer">Risk Warning</span> of
                    Launchpool and HODLer Airdrops.
                </p>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
