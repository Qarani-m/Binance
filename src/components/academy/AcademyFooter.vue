<script setup>
</script>

<template>
    <footer class="bg-[#181A20] border-t border-[#2B3139] pt-24 pb-12">
        <div class="max-w-[1280px] mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                <!-- Brand & App Links -->
                <div class="lg:col-span-1 space-y-10">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-8 h-8 bg-[#FCD535] rounded-md flex items-center justify-center font-bold text-black italic">
                            B</div>
                        <div class="text-white font-bold leading-none">
                            <div class="text-[16px] tracking-widest uppercase">Binance</div>
                            <div class="text-[14px] text-[#848E9C]">ACADEMY</div>
                        </div>
                    </div>
                    <div class="text-[#848E9C] text-[12px]">© 2026 Binance Academy. All Rights Reserved.</div>
                    <div class="flex flex-col gap-3">
                        <button
                            class="bg-[#2B3139] hover:bg-[#323942] p-2 rounded-lg flex items-center gap-3 w-[160px]">
                            <div
                                class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px]">
                                🍎</div>
                            <div class="text-left leading-none">
                                <div class="text-[8px] text-[#848E9C]">Download on the</div>
                                <div class="text-white text-[12px] font-bold">App Store</div>
                            </div>
                        </button>
                        <button
                            class="bg-[#2B3139] hover:bg-[#323942] p-2 rounded-lg flex items-center gap-3 w-[160px]">
                            <div
                                class="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-[10px]">
                                ▶️</div>
                            <div class="text-left leading-none">
                                <div class="text-[8px] text-[#848E9C]">GET IT ON</div>
                                <div class="text-white text-[12px] font-bold">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Links Columns -->
                <div v-for="col in [
                    { title: 'Discover', links: ['Topics', 'Courses', 'Glossaries', 'Bitcoin Halving'] },
                    { title: 'Products', links: ['Exchange', 'BCF', 'Labs', 'Launchpool', 'Research', 'Trust Wallet'] },
                    { title: 'Company', links: ['Terms & Conditions', 'Privacy Policy', 'Disclaimer', 'Content Request', 'Feedback'] }
                ]" :key="col.title" class="space-y-6">
                    <h5 class="text-white font-bold text-[16px]">{{ col.title }}</h5>
                    <ul class="space-y-4 text-[14px] text-[#848E9C]">
                        <li v-for="link in col.links" :key="link"
                            class="hover:text-[#FCD535] cursor-pointer transition-colors">{{ link }}</li>
                    </ul>
                </div>

                <!-- Social & Language -->
                <div class="space-y-10">
                    <div class="flex flex-wrap gap-4 text-xl text-[#848E9C]">
                        <span v-for="icon in ['', '', '', '']" :key="icon"
                            class="hover:text-white cursor-pointer">{{ icon }}</span>
                    </div>
                    <div class="space-y-6">
                        <div class="flex items-center gap-2 text-[#848E9C] hover:text-white cursor-pointer group">
                            <span class="text-lg">🌐</span>
                            <span class="text-[14px]">English</span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="mt-20 pt-8 border-t border-[#2B3139] flex justify-between items-center text-[12px] text-[#848E9C]">
                <div class="hover:text-white cursor-pointer">Cookie Preferences</div>
                <div
                    class="bg-[#FCD535] w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl cursor-pointer shadow-xl">
                    ?</div>
            </div>
        </div>
    </footer>
</template>
