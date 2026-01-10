<script setup>
</script>

<template>
    <div class="py-24 bg-[#181A20]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white mb-16 uppercase tracking-wider">Glossary</h2>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <!-- Left Stats/Search -->
                <div class="lg:col-span-4 space-y-8">
                    <div class="space-y-2">
                        <div class="text-[#FCD535] text-[72px] font-black leading-none">444</div>
                        <p class="text-[#EAECEF] text-[16px] font-medium leading-relaxed">
                            That's the number of terms in our glossary. How many do you know?
                        </p>
                    </div>

                    <div class="relative max-w-sm">
                        <input type="text" placeholder="Search glossary"
                            class="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-4 py-3 pl-10 text-white focus:border-[#FCD535] outline-none">
                        <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C]" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                        </svg>
                    </div>
                </div>

                <!-- Right Term Cards -->
                <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="term in [{ name: 'Premining', desc: 'When a portion of cryptocurrency tokens is mined or created before its official launch.' }, { name: 'Whitelist', desc: 'A list of allowed or trusted individuals, computer programs, or cryptocurrency addresses in relation to a...' }]"
                        :key="term.name"
                        class="bg-[#1E2329] border border-[#2B3139] rounded-[24px] p-8 space-y-6 flex flex-col">
                        <div class="space-y-4 flex-1">
                            <svg class="w-8 h-8 text-[#FCD535] opacity-40" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16C10.9124 16 10.017 16.8954 10.017 18L10.017 21H14.017ZM20 21V12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12V21H20Z" />
                            </svg>
                            <h3 class="text-[28px] font-bold text-white">{{ term.name }}</h3>
                            <p class="text-[#848E9C] text-[16px] leading-relaxed line-clamp-3">
                                {{ term.desc }}
                            </p>
                        </div>
                        <button
                            class="bg-[#2B3139] hover:bg-[#323942] text-white font-bold px-6 py-2 rounded-lg text-[14px] flex items-center justify-between group transition-all">
                            Full definition
                            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke-width="2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
