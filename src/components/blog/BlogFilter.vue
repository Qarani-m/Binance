<script setup>
defineProps(['active'])
defineEmits(['update:active'])

const categories = [
    'All', 'From our CEO', 'Leadership', 'Ecosystem', 'Community', 'Markets', 'VIP', 'Charity', 'Culture', 'Security', 'Education', 'Research', 'P2P', 'Earn'
]
</script>

<template>
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#2B3139]">
        <button v-for="cat in categories" :key="cat" @click="$emit('update:active', cat)"
            :class="active === cat ? 'bg-[#1E2329] text-white' : 'text-[#848E9C] hover:text-white'"
            class="px-4 py-2 rounded-lg text-[13px] whitespace-nowrap transition-colors">
            {{ cat }}
        </button>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
