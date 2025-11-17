<template>
    <div>
        <template v-for="(block, index) in blocks">
            <component
                :is="componentsMap[block?.acf_fc_layout]"
                :block="block"
            />
        </template>
    </div>
</template>
<script setup>
import TituloInformacion from './TituloInformacion.vue'
import TituloTextoBoton from './TituloTextoBoton.vue'
import TextoDobleColumna from './TextoDobleColumna.vue'
import Imagen from './Imagen.vue'
import DosColumnas from './DosColumnas.vue'
import Slider from './Slider.vue'
import TextoGrande from './TextoGrande.vue'
import Horario from './Horario.vue'
import InformacionGeneral from './InformacionGeneral.vue'
import SalidasProfesionales from './SalidasProfesionales.vue'
import PlanEstudios from './PlanEstudios.vue'
import PorQueEstudiar from './PorQueEstudiar.vue'
import TextoCentrado from './TextoCentrado.vue'
import PracticasEmpresas from './PracticasEmpresas.vue'
import LoQueOpinan from './LoQueOpinan.vue'
import AccesoPrecios from './AccesoPrecios.vue'
import Profesorado from './Profesorado.vue'
import Proyectos from './Proyectos.vue'
import Encabezado from './Encabezado.vue'
import Estudios from './Estudios.vue'
import MediaScroll from './MediaScroll.vue'
import Temas from './Temas.vue'
import Eventos from './Eventos.vue'
import SliderProyectos from './SliderProyectos.vue'


const props = defineProps({
    blocks: Array,
})

const componentsMap = {
    titulo_e_informacion: TituloInformacion,
    titulo_texto_boton: TituloTextoBoton,
    texto_y_doble_columna: TextoDobleColumna,
    imagen: Imagen,
    columnas: DosColumnas,
    slider: Slider,
    texto_grande: TextoGrande,
    horario: Horario,
    informacion_general: InformacionGeneral,
    salidas_profesionales: SalidasProfesionales,
    plan_de_estudios: PlanEstudios,
    por_que_estudiar: PorQueEstudiar,
    texto_centrado: TextoCentrado,
    practicas_en_empresas: PracticasEmpresas,
    lo_que_opinan: LoQueOpinan,
    acceso_y_precios: AccesoPrecios,
    profesorado: Profesorado,
    proyectos: Proyectos,
    encabezado: Encabezado,
    estudios: Estudios,
    media_scroll: MediaScroll,
    temas: Temas,
    eventos: Eventos,
    slider_proyectos: SliderProyectos,
}

</script>