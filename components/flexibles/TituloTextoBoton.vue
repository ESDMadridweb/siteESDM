<template>
    <div class="border-t border-g3">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 px-3 lg:px-6 pt-4 lg:pt-6">
            <div class="lg:col-span-4">
                <h2 class="max-w-[250px] text-BO3">{{ block?.titulo }}</h2>
            </div>
            <div class="lg:col-span-8 flex flex-col gap-6">
                <div v-if="block?.texto" v-html="block?.texto" class="text-BO3 lg:text-T06 content flex font-book flex-col gap-5 lg:gap-6" :class="{ 'lg:!text-T04' : block?.texto_grande }" />
                <CommonLink 
                    v-if="block?.boton"
                    :to="block?.boton?.url" 
                    :target="block?.boton?.target"
                    class="px-4 py-3 bg-black text-white text-BO4 lg:text-BO3 w-fit"
                >
                    {{ block?.boton?.title }}
                </CommonLink>
                <div v-if="block?.descargas && block?.descargas?.length > 0" class="flex flex-col gap-4">
                    <div v-for="descarga in block?.descargas">
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
           
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})

</script>
<style scoped>
.content:deep(ul){
    @apply flex flex-col
}
.content:deep(li){
    @apply text-BO4 lg:text-BO3 list-inside list-disc
}
.content:deep(table){
    @apply text-BO4
}

.content:deep(table td),
.content:deep(table th){
    @apply p-2 border
}
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
.content:deep(h3){
    @apply text-g4
}
</style>