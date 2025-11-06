<template>
    <div 
        class="fixed top-0 left-0 w-full h-full bg-[#04040600] backdrop-blur-0 transition-all duration-300 ease-in-out" 
        :class="{ 
            '!bg-[#04040660] !backdrop-blur-sm' : load 
        }" 
    />
</template>
<script setup>
defineProps({
    load: Boolean
})
</script>