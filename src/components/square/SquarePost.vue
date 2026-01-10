<script setup>
defineProps(['post'])
</script>

<template>
    <div
        class="bg-[#181A20]/40 border border-[#2B3139]/50 rounded-xl p-4 hover:bg-[#181A20]/60 transition-colors group cursor-pointer">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    :style="{ backgroundColor: post.avatarColor }">
                    {{ post.author[0] }}
                </div>
                <div>
                    <div class="flex items-center gap-1.5">
                        <span class="text-white font-bold text-[14px]">{{ post.author }}</span>
                        <span v-if="post.isPro"
                            class="text-[10px] bg-[#FCD535] text-black px-1 rounded font-bold uppercase">Pro</span>
                    </div>
                    <div class="text-[11px] text-[#848E9C]">{{ post.time }} ago</div>
                </div>
            </div>
            <button
                class="bg-[#FCD535]/10 text-[#FCD535] hover:bg-[#FCD535]/20 px-3 py-1 rounded text-[11px] font-bold transition-colors">
                Follow
            </button>
        </div>

        <!-- Content -->
        <div class="text-[14px] text-[#EAECEF] whitespace-pre-wrap leading-relaxed mb-4">
            {{ post.content }}
        </div>

        <!-- Media (Placeholder) -->
        <div v-if="post.hasImage"
            class="aspect-video w-full rounded-lg mb-4 bg-[#0B0E11] border border-[#2B3139] flex items-center justify-center overflow-hidden">
            <div class="w-full h-full opacity-40" :style="{ background: post.imageBg }"></div>
            <div class="absolute text-[#2B3139]">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c0 1.1.9-2 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
            </div>
        </div>

        <!-- Footer Stats -->
        <div class="flex items-center justify-between pt-2 border-t border-[#2B3139]/30">
            <div class="flex items-center gap-6">
                <div
                    class="flex items-center gap-1.5 text-[#848E9C] text-[12px] hover:text-[#FCD535] transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            stroke-width="2" />
                    </svg>
                    {{ post.stats.likes }}
                </div>
                <div
                    class="flex items-center gap-1.5 text-[#848E9C] text-[12px] hover:text-[#FCD535] transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            stroke-width="2" />
                    </svg>
                    {{ post.stats.comments }}
                </div>
                <div
                    class="flex items-center gap-1.5 text-[#848E9C] text-[12px] hover:text-[#FCD535] transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            stroke-width="2" />
                    </svg>
                    {{ post.stats.shares }}
                </div>
            </div>
            <div class="flex items-center gap-3">
                <svg class="w-4 h-4 text-[#848E9C] hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" stroke-width="2" />
                </svg>
                <svg class="w-4 h-4 text-[#848E9C] hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M5 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                </svg>
            </div>
        </div>
    </div>
</template>
