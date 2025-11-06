<template>
    <div class="px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-12">
        <div v-html="block?.texto" class="text-BO2 lg:text-T04 font-book" 
        :class="{ 
            'col-span-12 indent-[25%] lg:indent-[41.6%]' : block?.cubrir_todo_el_ancho,
            'lg:col-span-7 lg:col-start-6' : !block?.cubrir_todo_el_ancho,
        }" 
        />
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object
})
</script>