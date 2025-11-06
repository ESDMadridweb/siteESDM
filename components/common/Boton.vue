<template>
    <CommonLink 
        v-if="block?.boton"
        :to="block?.boton?.url" 
        :target="block?.boton?.target"
        class="px-4 py-3 bg-black text-white text-BO4 lg:text-BO3 w-fit"
    >
        {{ block?.boton?.title }}
    </CommonLink>
</template>
<script setup>
const props = defineProps({
    block: Object
})
</script>