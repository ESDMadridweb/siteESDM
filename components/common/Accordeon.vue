<template>
    <div>
        <CommonItemAccordeon 
            v-for="(item, index) in block" 
            :index="index+1" 
            :credits="item?.creditos" 
            :item="item"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    block: Object,
})
</script>