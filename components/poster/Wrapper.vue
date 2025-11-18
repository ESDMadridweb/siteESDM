<template>
    <div class="w-full transition-opacity duration-500 ease-in-out opacity-100" :class="{ '!opacity-0 !pointer-events-none' : stateLoad < 5 }">
        <CommonWrapperScrollHorizontal v-if="mode == 'Galeria'">
            <slot />
        </CommonWrapperScrollHorizontal>
        <div v-else class="grid grid-cols-2 lg:grid-cols-6 px-6 gap-x-8 lg:gap-x-16 gap-y-8 lg:gap-y-16 py-8 lg:py-16">
            <slot />
        </div>        
    </div>
</template>
<script setup>
const props = defineProps({
    mode: String,
    stateLoad: Number
})
</script>