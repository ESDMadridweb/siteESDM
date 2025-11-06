<template>
    <div>
        <div class="flex flex-col gap-8">
            <h3 class="text-TK04 font-pkiko px-3 lg:px-6">{{ block?.title }}</h3>
            <div class="border-t border-g3">
                <template v-if="block?.eventos && block?.eventos?.length > 0">
                    <div 
                        v-for="(evento, index) in block?.eventos" 
                        @click="handleData(evento)"
                        @mouseenter="
                            cursorStore.active = true;
                            cursorStore.text = Ver;
                        " 
                        @mouseleave="
                            cursorStore.active = false;
                            cursorStore.text = '';
                        "
                    >
                        <div class="grid grid-cols-12 gap-3 lg:gap-6 px-3 lg:px-6 py-4 group hover:bg-green transition-colors duration-500 ease-in-out" :class="{ 'border-t border-g3' : index != 0 }">
                            <div class="col-span-2 lg:col-span-1">
                                <div class="text-LM02 font-mono max-w-[60px]"> {{ getDates(evento?.from, evento?.to) }}</div>
                            </div>
                            <h3 class="col-span-7 lg:col-span-5 text-BO3 lg:text-T03 font-book max-w-[700px]">{{ evento?.title }}</h3>
                            <div class="hidden lg:block col-span-5 text-BO3" v-html="evento?.content" />
                            <div class="col-span-3 lg:col-span-1">
                                <img 
                                    class="w-full aspect-[1/1.17] object-cover object-center"
                                    width="360"
                                    :src="evento?.image" 
                                    :alt="evento?.title"
                                >
                            </div>
                        </div>
                    </div>
                </template>
                
            </div>
        </div>

        <div class="fixed top-0 left-0 w-full h-screen z-[99] overflow-x-hidden opacity-0 pointer-events-none not-scrollbar" :class="{ '!opacity-100 !pointer-events-auto' : setData }">
            <div @click="cleanData()" class="fixed top-0 left-0 w-full h-full bg-[#04040600] backdrop-blur-0 transition-all duration-500 ease-in-out" :class="{ '!bg-[#04040660] !backdrop-blur-sm' : animation }"></div>
            <div data-lenis-prevent class="bg-white absolute top-24 lg:top-0 right-0 w-full min-h-screen lg:w-4/5 z-20 translate-y-full lg:translate-y-0 lg:translate-x-full transition-transform duration-500 ease-in-out" :class="{ 'lg:!translate-x-0 !translate-y-0' : animation }" >
                <div class="text-BO3 relative w-full flex justify-end py-3 px-4">
                    <div @click="cleanData()" class="cursor-pointer">
                        {{ locale == 'es' ? 'Cerrar' : 'Close' }}
                    </div>
                </div>
                <ModalsAgenda :data="setData" />
            </div>
        </div>
    </div>
    
</template>
<script setup>
const props = defineProps({
    block: Object,
})
const { locale } = useI18n()
const cursorStore = useCursorStore()

const Ver = computed(() => (locale.value === 'es' ? 'Ver' : 'See'))

const siteStore = useSiteStore()
const setData = ref(null)

const handleData = (data) => {
    siteStore.overflowHidden = true
    setData.value = data
    animation.value = true
}

const cleanData = () => {
    siteStore.overflowHidden = false
    animation.value = false
    setTimeout(() => {
        setData.value = null
    }, 500);
}

const animation = ref(false)

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

</script>