<template>
    <h1 class="px-3 lg:px-6 pb-16 lg:pb-32 text-T03 lg:text-TK04 font-pkiko lg:max-w-[70%]">{{ data?.title }}</h1>
    <div class="border-t border-g4 grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 pt-3 lg:pt-6 pb-16 gap-6 lg:gap-0">
        <div class="lg:col-span-5 text-BO4 lg:text-BO3">{{ Publicado }} {{ data?.date }}</div>
        <div class="lg:col-span-7 flex flex-col gap-8">
            <div v-html="data?.content" class="text-BO3 lg:text-T06 whitespace-pre-line content" />
            <CommonLink v-if="data?.button" :to="data?.button?.url" class="text-BO3 bg-black text-white py-2 px-3 w-fit">
                {{ data?.button?.title }}
            </CommonLink>
        </div>
    </div>
    <div v-if="data?.downloads" class="border-t border-g3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 px-3 lg:px-6 pt-3 lg:pt-6 pb-16">
        <div class="lg:col-span-5 text-BO4 lg:text-BO3">{{ Descargas }}</div>
        <div class="lg:col-span-7 flex flex-col gap-4">
            <div v-for="descarga in data?.downloads">
                <a :href="descarga?.descarga?.url" :download="true" class="text-BO3 flex gap-3 items-start">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="28" fill="#040406"/>
                        <path d="M13.9984 4.5481V16.0074M8.39844 11.2888L13.9984 16.6814L19.5984 11.2888" stroke="#FDFDFD" stroke-width="1.5"/>
                        <path d="M8.39844 22.2852H19.5984" stroke="#FDFDFD" stroke-width="1.5"/>
                    </svg>
                    <span>{{ descarga?.descarga?.title }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object,
})
const { locale } = useI18n()
const Descargas = computed(() => (locale.value === 'es' ? 'Descargas' : 'Downloads'))
const Publicado = computed(() => (locale.value === 'es' ? 'Publicado el' : 'Published'))
</script>