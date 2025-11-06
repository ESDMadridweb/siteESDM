<template>
    <div>
        <h1 class="px-3 lg:px-6 pb-16 lg:pb-32 text-T03 lg:text-TK04 font-pkiko capitalize lg:max-w-[70%]">{{ data?.title || data?.titulo }}</h1>
        <FlexiblesProyecto v-if="data?.template == 'Proyecto'" :blocks="data?.content" :temas="data?.temas" />
        <FlexiblesArticulo v-if="data?.template == 'Articulo'" :blocks="data?.content" :temas="data?.temas" :image="data?.image" />
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
})
const posterStore = usePosterStore()
onMounted(() => {
    setTimeout(() => {
        posterStore.setPauseTrue()
    }, 1);
    
})
onBeforeUnmount(() => {
    posterStore.setPauseFalse()
})
</script>