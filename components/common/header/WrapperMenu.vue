<template>
    <div 
        data-lenis-prevent 
        class="fixed top-0 left-0 w-full not-scrollbar bg-green lg:bg-[transparent] overflow-auto h-[100dvh] z-40 flex justify-end transition-transform duration-500 translate-x-0 ease-in-out pointer-events-none"
        :class="{ '!translate-x-full' : !menuStore.isOpened }"
    >
        <div class="bg-green w-full lg:w-4/5 grid grid-cols-1 gap-y-10 lg:gap-y-0 lg:grid-cols-4 pt-20 pointer-events-auto">
            <slot />
        </div>
    </div>
</template>
<script setup>
const menuStore = useMenuStore()
</script>