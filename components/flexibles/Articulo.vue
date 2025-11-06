<template>
    <div>
        <div class="flex flex-col gap-6 px-3 lg:px-6">
            <div class="text-LM02 uppercase">
                <h2>Por {{ blocks?.autor }}</h2>
                <h3>{{ blocks?.info_del_autor }}</h3>
            </div>
            <img 
                width="1920"
                class="w-full"
                :src="image" 
                :alt="blocks?.autor"
            >
        </div>
        <div v-if="blocks?.contenido && blocks?.contenido.length > 0" class="flex flex-col gap-6 lg:gap-10 py-8 lg:py-16">
            <template v-for="block in blocks?.contenido">
                <FlexiblesTextoGrande v-if="block?.acf_fc_layout == 'texto_grande'" :block="block" />
                <FlexiblesTextoNormal v-if="block?.acf_fc_layout == 'texto_normal'" :block="block" />
                <FlexiblesImagen v-if="block?.acf_fc_layout == 'imagen'" :block="block" />
                <FlexiblesBoton v-if="block?.acf_fc_layout == 'boton'" :block="block" />
            </template>
        </div>
        
    </div>
</template>
<script setup>
const props = defineProps({
    blocks: Object,
    temas: Array,
    image: String,
})
</script>