<template>
    <div class="bg-green px-3 lg:px-6 pt-3 lg:pt-6 pb-10 lg:pb-28">
        <h2 class="text-BO4 lg:text-BO3 pb-8 lg:pb-0">{{ block?.titulo }}</h2>
        <div v-html="block?.texto" class="text-BO2 lg:text-T04 indent-[25%] lg:indent-[41.6%] mb-10 lg:mb-14 font-book" />
        <div class="grid grid-cols-1 lg:grid-cols-12">
            <div class="lg:col-start-6 lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-3 text-BO3 px-6 lg:px-0">
                <div v-for="item in block?.lista" class="relative before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-5 flex items-center npm run dbefore:content-[''] before:w-2 lg:before:w-3 before:h-2 lg:before:h-3 before:bg-black before:rounded-full">{{ item?.texto }}</div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>