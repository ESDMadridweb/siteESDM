<template>
    <div class="flex flex-col" :class="{ 'bg-g1' : block?.fondo_gris }">
        <h2 v-if="block?.titulo" class="font-pkiko text-T03 lg:text-TK04 px-3 lg:px-6 border-b border-g3 pb-6 lg:pb-8">{{ block?.titulo }}</h2>
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-12 pt-4 lg:pt-6 pb-10 lg:pb-20">
            <div class="lg:col-span-5 px-3 lg:px-6">
                <div
                    v-if="block?.info"
                    v-html="block?.info" 
                    class="content-info text-BO3"
                />
            </div>
            <div class="lg:col-span-7 flex flex-col gap-8 px-3 lg:pl-0 lg:pr-6">
                <div
                    v-if="block?.texto_principal"
                    v-html="block?.texto_principal" 
                    class="content text-BO3 flex flex-col gap-4 lg:gap-6"
                />
                <FlexiblesAccordeon
                    v-if="block?.accordeon?.lista"
                    :title="block?.accordeon?.titulo" 
                    :items="block?.accordeon?.lista" 
                />
                <div 
                    v-if="block?.texto_secundario"
                    v-html="block?.texto_secundario"
                    class="content text-BO3"
                />
                <template v-if="block?.boton">
                    <CommonLink 
                        v-if="block?.boton"
                        :to="block?.boton?.url" 
                        :target="block?.boton?.target"
                        class="px-4 py-3 bg-black text-white text-BO4 lg:text-BO3 w-fit"
                    >
                        {{ block?.boton?.title }}
                    </CommonLink>
                </template>
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
.content:deep(h4){
    @apply text-g4
}
.content:deep(a){
    @apply text-green
}
.content-info:deep(h4){
    @apply text-g4
}
.content-info:deep(h5){
    @apply !text-LM02 font-mono mt-4
}
</style>