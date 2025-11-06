<template>
    <div class="px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 text-BO3">
        <div class="col-span-5">
            <div v-html="block?.texto" />
        </div>
        <div class="col-span-7 grid grid-cols-2">
            <div v-html="block?.columna_izquierda" class="column" />
            <div v-html="block?.columna_derecha" class="column" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>
<style scoped>
.column:deep(a){
    @apply text-g4
}
</style>