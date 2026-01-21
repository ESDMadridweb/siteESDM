<template>
    <div 
        data-lenis-prevent 
        class="bg-white absolute top-24 lg:top-0 right-0 w-full min-h-full lg:w-10/12 z-20 transition-transform duration-500 ease-in-out translate-y-full lg:translate-y-0 lg:translate-x-full" 
        :class="{ 
            '!translate-y-0 lg:!translate-x-0' : load
        }"
    >
        <slot />
    </div>
</template>
<script setup>
defineProps({
    load: Boolean
})
</script>