<template>
    <FlexiblesContent :blocks="blocks" class="flex flex-col gap-10 lg:gap-32 my-10 lg:my-32" />
</template>
<script setup>
const props = defineProps({
    blocks: Array,
})
</script>