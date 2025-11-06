<template>
    <div>
        <div class="border-b border-g3 pb-6 lg:pb-8 px-3 lg:px-6">
            <h2 class="text-T04 lg:text-TK04 font-pkiko max-w-[650px]">
                {{ block?.titulo }}
            </h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 px-3 lg:px-6">
            <ul class="lg:col-start-5 lg:col-span-8">
                <li v-for="(item, index) in block?.lista" class="py-4 flex w-full" :class="{ 'border-t border-g3' : index != 0 }">
                    <h3 class="w-2/5 text-L02 uppercase">{{ item?.titulo }}</h3>
                    <div v-html="item?.texto" class="w-3/5 text-BO3" />
                </li>
            </ul>

        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>