<script setup>
</script>

<template>
    <div class="py-24 bg-[#181A20] overflow-hidden">
        <div class="max-w-[1280px] mx-auto px-6 text-center space-y-16">
            <div class="space-y-8">
                <h2 class="text-[36px] md:text-[48px] font-bold text-white leading-tight">Want to partner with Binance
                    Academy?</h2>
                <button
                    class="bg-[#FCD535] hover:bg-[#F0B90B] text-black font-extrabold px-12 py-3 rounded-lg text-[18px] transition-all shadow-xl shadow-[#FCD535]/10">
                    Join us
                </button>
            </div>

            <!-- Tandem Bicycle Illustration Mockup -->
            <div class="relative pt-12">
                <div class="flex justify-center items-end gap-0">
                    <!-- Simplified tandem bicycle and 3 riders -->
                    <div class="relative w-full max-w-2xl h-[240px]">
                        <div class="absolute bottom-0 left-0 right-0 h-2 bg-white/5 mx-auto"></div>
                        <!-- Simplified SVG riders chain -->
                        <svg viewBox="0 0 800 200" class="w-full h-full">
                            <path d="M100 180h600M200 180l40-60m300 60l-40-60" stroke="#323942" stroke-width="4" />
                            <!-- Rider 1 (Blue) -->
                            <circle cx="250" cy="80" r="15" fill="#3B82F6" />
                            <rect x="240" y="95" width="20" height="40" rx="10" fill="#3B82F6" />
                            <!-- Rider 2 (Red) -->
                            <circle cx="400" cy="80" r="15" fill="#EF4444" />
                            <rect x="390" y="95" width="20" height="40" rx="10" fill="#EF4444" />
                            <!-- Rider 3 (Green) -->
                            <circle cx="550" cy="80" r="15" fill="#10B981" />
                            <rect x="540" y="95" width="20" height="40" rx="10" fill="#10B981" />

                            <!-- Tandem Frame lines -->
                            <path d="M250 135 L400 135 L550 135" stroke="white" stroke-width="6"
                                stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
