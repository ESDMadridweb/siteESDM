<template>
    <div 
        v-html="block?.texto" 
        class="encabezado font-pkiko leading-[0.8] text-TK04 lg:text-DO2 px-3 lg:px-6 lg:text-center flex flex-col"
    ></div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>

<style scoped>
.encabezado:deep(p:nth-child(1)){
    @apply lg:self-start -indent-10 pl-10 lg:indent-0 lg:pl-0
}
.encabezado:deep(p:nth-child(2)){
    @apply self-end lg:self-center
}
.encabezado:deep(p:nth-child(3)){
    @apply lg:self-end
}
</style>