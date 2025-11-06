<template>
    <div class="px-3 lg:px-6 flex justify-center">
        <div class="font-book text-BO3 lg:text-T03 w-full max-w-[1100px] text-center content" v-html="block?.texto" />
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>
<style scoped>
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
</style>