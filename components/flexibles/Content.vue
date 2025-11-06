<template>
    <div>
        <template v-for="(block, index) in blocks">
            <FlexiblesTituloInformacion v-if="block?.acf_fc_layout == 'titulo_e_informacion'" :block="block" />
            <FlexiblesTituloTextoBoton v-if="block?.acf_fc_layout == 'titulo_texto_boton'" :block="block" />
            <FlexiblesTextoDobleColumna v-if="block?.acf_fc_layout == 'texto_y_doble_columna'" :block="block" />
            <FlexiblesImagen v-if="block?.acf_fc_layout == 'imagen'" :block="block" />
            <FlexiblesDosColumnas v-if="block?.acf_fc_layout == 'columnas'" :block="block" />
            <FlexiblesSlider v-if="block?.acf_fc_layout == 'slider'" :block="block" />
            <FlexiblesTextoGrande v-if="block?.acf_fc_layout == 'texto_grande'" :block="block" />
            <FlexiblesHorario v-if="block?.acf_fc_layout == 'horario'" :block="block" />
            <FlexiblesInformacionGeneral v-if="block?.acf_fc_layout == 'informacion_general'" :block="block" />
            <FlexiblesSalidasProfesionales v-if="block?.acf_fc_layout == 'salidas_profesionales'" :block="block" />
            <FlexiblesPlanEstudios v-if="block?.acf_fc_layout == 'plan_de_estudios'" :block="block" />
            <FlexiblesPorQueEstudiar v-if="block?.acf_fc_layout == 'por_que_estudiar'" :block="block" />
            <FlexiblesTextoCentrado v-if="block?.acf_fc_layout == 'texto_centrado'" :block="block" />
            <FlexiblesPracticasEmpresas v-if="block?.acf_fc_layout == 'practicas_en_empresas'" :block="block" />
            <FlexiblesLoQueOpinan v-if="block?.acf_fc_layout == 'lo_que_opinan'" :block="block" />
            <FlexiblesAccesoPrecios v-if="block?.acf_fc_layout == 'acceso_y_precios'" :block="block" />
            <FlexiblesProfesorado v-if="block?.acf_fc_layout == 'profesorado'" :block="block" />
            <FlexiblesProyectos v-if="block?.acf_fc_layout == 'proyectos'" :block="block" />
            <FlexiblesEncabezado v-if="block?.acf_fc_layout == 'encabezado'" :block="block" />
            <FlexiblesEstudios v-if="block?.acf_fc_layout == 'estudios'" :block="block" />
            <FlexiblesMediaScroll v-if="block?.acf_fc_layout == 'media_scroll'" :block="block" />
            <FlexiblesTemas v-if="block?.acf_fc_layout == 'temas'" :block="block" />
            <FlexiblesEventos v-if="block?.acf_fc_layout == 'eventos'" :block="block" />
            <FlexiblesSliderProyectos v-if="block?.acf_fc_layout == 'slider_proyectos'" :block="block" />
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    blocks: Array,
})
</script>