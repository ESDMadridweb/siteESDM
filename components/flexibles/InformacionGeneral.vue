<template>
    <div id="info-general" class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 border-t border-g3 pt-4 lg:pt-3">
        <h2 class="lg:col-span-5 text-BO3 lg:py-3">{{ block?.titulo }}</h2>
        <div class="lg:col-span-7">
            <div v-for="(item, index) in block?.fila" class="grid gap-[10px] grid-cols-2 lg:grid-cols-4 py-[10px] lg:py-3" :class="{ 'border-t border-g3' : index != 0 }">
                <h3 class="uppercase text-LM02 flex items-start lg:items-center">{{ item?.titulo }}</h3>
                <div class="relative lg:col-span-3 flex flex-col gap-[10px]">
                    <div v-html="item?.texto" class="text-BO3 content" />
                    <div v-if="item?.tag" class="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 text-L02 px-[6px] w-fit bg-g2 py-1">{{ item?.tag }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object
})
</script>

<style scoped>
.content:deep(a){
    @apply underline
}
</style>