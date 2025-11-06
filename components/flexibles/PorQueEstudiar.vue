<template>
    <div class="border-t border-g3 px-6 pt-6 grid grid-cols-1 lg:grid-cols-12">
        <div class="lg:col-span-5 flex flex-col gap-5">
            <h2 class="text-BO4 lg:text-BO3 lg:max-w-36 pb-5 lg:pb-0">{{ block?.titulo }}</h2>
        </div>
        <div class="lg:col-span-7 border-t lg:border-t-0 border-g3">
            <CommonAccordeon :block="block?.fila" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    block: Object,
})
</script>