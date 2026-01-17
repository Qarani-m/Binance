<script setup>
import { ref } from 'vue'

const videos = ref([
    { id: 1, src: '/videos/humans-luis-en.mp4', isPlaying: false, ref: null },
    { id: 2, src: '/videos/humans-mohit-en.mp4', isPlaying: false, ref: null },
    { id: 3, src: '/videos/humans-dennis-en.mp4', isPlaying: false, ref: null }
])

const videoRefs = ref([])

const togglePlay = (index) => {
    const video = videoRefs.value[index]
    if (video.paused) {
        // Pause all other videos first
        videoRefs.value.forEach((v, i) => {
            if (i !== index) {
                if (v) v.pause()
                videos.value[i].isPlaying = false
            }
        })
        video.play()
        videos.value[index].isPlaying = true
    } else {
        video.pause()
        videos.value[index].isPlaying = false
    }
}

// Ensure thumbnails show by loading the first frame
import { onMounted } from 'vue'
onMounted(() => {
    videoRefs.value.forEach(video => {
        if (video) {
            video.currentTime = 0.1
        }
    })
})
</script>

<template>
    <section class="py-20 border-t border-bg-card/10">
        <div class="max-w-[1248px] mx-auto px-6">

            <!-- Header Row -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div>
                    <h2 class="text-[40px] leading-[48px] font-bold text-text-primary mb-2 font-binance">
                        FUNDS ARE <span class="text-primary">SAFU</span>
                    </h2>
                    <p class="max-w-[600px] text-text-secondary text-[16px] leading-relaxed">
                        The Security of User Assets Fund (SAFU) was established in 2018 to protect your funds in rare
                        emergencies. Your security is our priority.
                    </p>
                </div>

                <div class="lg:text-right">
                    <p class="text-[12px] text-text-secondary mb-2">As of September 2025, the SAFU fund wallet comprises
                        a reserve of</p>
                    <div class="text-[32px] font-bold text-primary font-binance mb-4">1,000,000,000 USDC</div>
                    <p class="text-[12px] text-text-disabled font-mono break-all mb-6">
                        SAFU Wallet: 0x420ef1f25563593af5fE3f9b9d3bC56a8bd8c104
                    </p>

                    <div class="flex flex-wrap gap-12 lg:justify-end">
                        <div>
                            <div class="text-[24px] font-bold text-primary">7,488,223</div>
                            <div class="text-[14px] text-text-primary">Users helped</div>
                        </div>
                        <div>
                            <div class="text-[24px] font-bold text-primary">$229,433,449</div>
                            <div class="text-[14px] text-text-primary">Funds recovered</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Video Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="(video, index) in videos" :key="video.id" @click="togglePlay(index)"
                    class="group relative aspect-video bg-bg-card rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-primary/5 transition-all">

                    <video ref="videoRefs" class="w-full h-full object-cover" playsinline preload="metadata"
                        :src="video.src">
                    </video>

                    <!-- Play/Pause Overlay -->
                    <div v-if="!video.isPlaying"
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                        <div
                            class="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 transition-all duration-300">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
