<template>
    <div class="border-t border-g3 px-6 pt-6 grid grid-cols-1 lg:grid-cols-12">
        <div class="lg:col-span-5 flex flex-col gap-5">
            <h2 class="text-BO4 lg:text-BO3 pb-5 lg:pb-0">{{ block?.titulo }}</h2>
            <a :href="block?.descarga?.url" :download="true" class="text-L02 hidden lg:flex gap-3 items-start">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" fill="#040406"/>
                    <path d="M13.9984 4.5481V16.0074M8.39844 11.2888L13.9984 16.6814L19.5984 11.2888" stroke="#FDFDFD" stroke-width="1.5"/>
                    <path d="M8.39844 22.2852H19.5984" stroke="#FDFDFD" stroke-width="1.5"/>
                </svg>
                <span class="max-w-32">{{ block?.descarga?.title }}</span>
            </a>
        </div>
        <div class="lg:col-span-7 border-t lg:border-t-0 border-g3">
            <CommonAccordeon :block="block?.fila" />
        </div>
        <a :href="block?.descarga?.url" :download="true" class="text-BO3 lg:text-L02 lg:hidden flex gap-3 items-start mt-5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" fill="#040406"/>
                <path d="M13.9984 4.5481V16.0074M8.39844 11.2888L13.9984 16.6814L19.5984 11.2888" stroke="#FDFDFD" stroke-width="1.5"/>
                <path d="M8.39844 22.2852H19.5984" stroke="#FDFDFD" stroke-width="1.5"/>
            </svg>
            <span class="max-w-40">{{ block?.descarga?.title }}</span>
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    block: Object,
})
</script>