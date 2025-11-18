<script setup>
defineProps({
    src: {
        type: String,
    },
    alt: {
        type: String,
        default: 'image-alt'
    },
    width: {
        type: String,
        default: '1920'
    },
    loading: {
        type: String,
        default: 'lazy'
    }
})
</script>
<template>
    <img
        v-if="src"
        :src="src" 
        :alt="alt"
        :width="width"
        :loading="loading"
    >
</template>
