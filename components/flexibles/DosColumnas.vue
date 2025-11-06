<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6">
        <div class="col-start-6 col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 text-BO3 lg:text-T06">
            <div v-html="block?.izquierda" class="content" />
            <div v-html="block?.derecha" class="content" />
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
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
.content:deep(h4 a){
    @apply text-g4 text-BO3 transition-colors duration-300 ease-in-out
}
.content:deep(h4 a:hover){
    @apply text-green
}
</style>