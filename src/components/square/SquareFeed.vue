<script setup>
import SquarePost from './SquarePost.vue'

const posts = [
    {
        author: 'Tienad',
        avatarColor: '#1E2329',
        time: '41m',
        isPro: true,
        content: '$SUI DID EXACTLY WHAT IT WAS SUPPOSED TO DO\n\n- Cleared the lows ✅\n- Built solid accumulation ✅\n- Ripped 145% from $1.30 ✅',
        hasImage: true,
        imageBg: 'linear-gradient(to bottom, #1E2329, #0B0E11)',
        stats: { likes: '3.7k', comments: '67', shares: '202' }
    },
    {
        author: 'Wendy99_',
        avatarColor: '#FCD535',
        time: '58m',
        content: 'What is Parallelization and How Does It Work?\n\nAs blockchain networks grow, their ability to process large volumes of transactions efficiently becomes increasingly important. One technique gaining attention is parallelization...',
        stats: { likes: '1.2k', comments: '45', shares: '89' }
    },
    {
        author: 'Ann Vibes',
        avatarColor: '#627EEA',
        time: '1h',
        content: '$PIXEL - LONG IDEA 🚀\n\nET: 0.0090x\nSL: 0.0088\nTP: 0.0092 - 0.0094 - 0.0097 🎯',
        hasImage: true,
        imageBg: '#181A20',
        stats: { likes: '13.4k', comments: '16', shares: '341' }
    }
]
</script>

<template>
    <div class="space-y-4">
        <div class="h-12 flex items-center gap-8 border-b border-[#2B3139] mb-4">
            <div
                class="h-full border-b-2 border-[#FCD535] flex items-center text-white font-bold text-[14px] cursor-pointer">
                Recommended</div>
            <div class="text-[#848E9C] hover:text-white transition-colors text-[14px] cursor-pointer">Following</div>
            <div class="text-[#848E9C] hover:text-white transition-colors text-[14px] cursor-pointer">News</div>
        </div>

        <SquarePost v-for="(post, i) in posts" :key="i" :post="post" />
    </div>
</template>
