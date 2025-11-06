<template>
    <div v-html="content" class="content flex flex-col gap-4 lg:gap-6" />
</template>
<script setup>
defineProps({
    content: String,
})
</script>
<style scoped>
.content:deep(h4){
    @apply text-g4
}
.content:deep(h5){
    @apply font-mono uppercase !text-LM02 pt-6
}
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
.content:deep(ul){
    @apply flex flex-col
}
.content:deep(li){
    @apply text-BO4 lg:text-BO3 list-inside list-disc
}
</style>