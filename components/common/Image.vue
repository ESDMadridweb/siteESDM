<script setup>
defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: 'image-alt'
    },
    width: {
        type: String,
        default: '1920'
    }
})
</script>
<template>
    <img
        :src="src" 
        :alt="alt"
        :width="width"
    >
</template>
