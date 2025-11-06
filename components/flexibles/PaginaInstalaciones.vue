<template>
    <FlexiblesContent 
        :blocks="blocks"
        class="flex flex-col gap-10 lg:gap-16 my-10 lg:my-16" 
    />
</template>
<script setup>
const props = defineProps({
    blocks: Array,
})
</script>