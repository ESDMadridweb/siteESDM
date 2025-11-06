<template>
    <div>
        <h5 v-if="title" class="font-mono text-LM02 border-b uppercase border-g3 pb-3">{{ title }}</h5>
        <div>
            <CommonItemAccordeon 
                v-for="(item, index) in items" 
                :item="item" 
                :index="index + 1"
            />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: String,
    items: Array,
})
</script>