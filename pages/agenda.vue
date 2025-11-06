<template>
    <div class="mt-6 lg:mt-SP10">
        <h1 class="px-3 pt-6 lg:px-6 lg:py-10 text-TK04 lg:text-DO2 uppercase font-pkiko break-words hyphens-auto">{{ title }}</h1>
        <div class="grid my-14 lg:my-28 lg:px-6">
            <template v-for="(item, index) in agendaData?.agendas">
                <span class="line-separator w-full h-[1px] bg-g3 transition-colors duration-300 ease-in-out"></span>
                <NuxtLink 
                    :to="`${(locale === 'es')?'/agenda/':'/en/calendar/'}${item?.slug}`" 
                    class="item-agenda w-full flex justify-between px-3 lg:px-0 py-3 lg:py-6 hover:text-blue box-content transition-colors duration-300 ease-in-out"
                    @mouseenter="
                        cursorStore.active = true;
                        cursorStore.text = Ver;
                    " 
                    @mouseleave="
                        cursorStore.active = false;
                        cursorStore.text = '';
                    "
                >
                    <div class="text-LM02 w-full max-w-[38px] lg:max-w-auto"> {{ getDates(item?.from, item?.to) }}</div>
                    <div class="w-full max-w-[568px] flex flex-col gap-3">
                        <h2 class="text-BO3 lg:text-T03 lg:font-book">{{ item?.title }}</h2>
                        <div class="hidden lg:block text-L02">
                            <span v-for="(category, index) in item?.categories">
                                <span>{{ category?.name }}</span>
                                <span v-if="item?.categories.length > 1 && index != item?.categories.length - 1">,&nbsp;</span>
                            </span>
                        </div>
                    </div>
                    <div v-html="item?.content" class="hidden lg:block text-BO4 w-full max-w-[455px]" />
                    <img 
                        width="100"
                        class="aspect-[1/1.3] object-cover object-center"
                        :src="item?.image" 
                        :alt="item?.title"
                    >
                </NuxtLink>
                <span v-if="index == agendaData?.agendas.length - 1" class="w-full bg-g3 h-[1px] transition-colors duration-300 ease-in-out"></span>
            </template>
        </div>
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script setup>
import { useSeoObject } from '../composables/seo';
import { useSiteStore } from '../../stores/site';

const route = useRoute()
const bodyClass = route.name
const siteStore = useSiteStore()
const cursorStore = useCursorStore()
const { locale } = useI18n()
const { data: agendaData } = await useFetch(`${siteStore.api}/get-agendas?lang=${locale.value}`)

const title = computed(() => (locale.value === 'es' ? 'Agenda' : 'Calendar'))
const Ver = computed(() => (locale.value === 'es' ? 'Ver' : 'See'))

const getDates = (from, to) => {
    const parseFecha = (fechaStr) => {
        const [fecha, tiempo, periodo] = fechaStr.split(' ');
        let [dia, mes, año] = fecha.split('/');
        let [hora, minuto] = tiempo.split(':');
        
        if (periodo.toLowerCase() === 'pm' && hora !== '12') {
            hora = String(Number(hora) + 12);
        } else if (periodo.toLowerCase() === 'am' && hora === '12') {
            hora = '00';
        }
        
        return new Date(`${año}-${mes}-${dia}T${hora}:${minuto}:00`);
    };
    
    const fechaDesde = parseFecha(from);
    const fechaHasta = parseFecha(to);
    
    const opciones = { day: '2-digit', month: 'short' };
    const diaDesde = fechaDesde.toLocaleDateString('es-ES', opciones).toUpperCase();
    const diaHasta = fechaHasta.toLocaleDateString('es-ES', opciones).toUpperCase();
    
    if (fechaDesde.toDateString() === fechaHasta.toDateString()) {
        return diaDesde;
    } else {
        return `${diaDesde.split(' ')[0]}-${diaHasta}`;
    }
}

onUnmounted(() => {
    cursorStore.active = false;
    cursorStore.text = '';
})

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

watchEffect(() => {
    useSeoObject(title.value, 'Escuela Superior de Diseño Madrid')
})
</script>

<style>
.item-agenda:hover + span{
    @apply bg-blue
}
span:has(+ .item-agenda:hover) {
    @apply bg-blue
}
</style>
