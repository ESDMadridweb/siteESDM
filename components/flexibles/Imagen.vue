<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6">
        <div class="lg:col-span-7 lg:col-start-6">
            <CommonImage
                width="1024"
                class="w-full"
                :src="block?.imagen?.sizes?.large" 
                :alt="block?.imagen?.alt"
            />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>