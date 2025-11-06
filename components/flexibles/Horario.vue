<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 gap-y-8">
        <div class="lg:col-span-2">
            <h3 class="text-LM02 uppercase">{{ block?.titulo }}</h3>
            <div v-html="block?.info" class="text-BO3" />
            <NuxtLink :to="block?.enlace?.url" :target="block?.enlace?.target" class="flex items-center gap-1 text-g4 text-BO4 mt-2">
                <span>{{ block?.enlace?.title }}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.26146 11.9987L3.32812 11.0654L9.72813 4.66536H3.99479V3.33203H11.9948V11.332H10.6615V5.5987L4.26146 11.9987Z" fill="#9E9E9E"/>
                </svg>
            </NuxtLink>
        </div>
        <div class="lg:col-start-6 lg:col-span-7 text-BO2 lg:text-T04 font-book">
            <div v-html="block?.texto" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object
})
</script>