<template>
    <FlexiblesContent :blocks="blocks" class="flex flex-col gap-16 my-16 lg:gap-32 lg:my-32" />
</template>
<script setup>
const props = defineProps({
    blocks: Array,
})
</script>