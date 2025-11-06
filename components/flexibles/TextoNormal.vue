<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 text-BO3 lg:text-T06">
        <div class="lg:col-start-6 lg:col-span-7" v-html="block?.texto" />
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>