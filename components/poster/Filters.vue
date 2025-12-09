<template>
    <div class="fixed top-0 left-0 z-40 w-full h-full bg-[#04040660] backdrop-blur-sm transition-all duration-1000 ease-in-out" @click="emit('close')" :class="{ '!pointer-events-none !opacity-0 !backdrop-blur-none' : !isOpen }"></div>
    <div class="bg-green fixed bottom-0 left-0 w-full p-3 lg:p-6 flex flex-col gap-6 z-50 transition-all duration-1000 ease-in-out" :class="{ 'translate-y-full' : !isOpen }">
        <div class="w-full flex justify-between text-BO4 lg:text-T05 mb-5">
            <span class="cursor-pointer" @click="clearFilters()">Limpiar filtros</span>
            <span class="cursor-pointer" @click="emit('close')">Cerrar</span>
        </div>
        <div class="flex flex-col gap-2">
            <h4 class="text-LM02 uppercase font-mono">Temas</h4>
            <div class="flex flex-wrap gap-y-1 gap-x-2 lg:gap-x-3 text-BO2 lg:text-T03">
                <template v-for="tema in data?.temas">
                    <span v-if="tema?.count > 0"  class="flex items-start font-book opacity-40 cursor-pointer select-none" @click="handleTemas(tema?.slug)" :class="{ '!opacity-100' : posterStore.temas.includes(tema.slug) }">
                        <span>{{ tema?.name }}</span>
                        <sup class="text-L02 pt-1">{{ tema?.count }}</sup>
                    </span>
                </template>
                
            </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-32">
            <div class="flex flex-col gap-2">
                <h4 class="text-LM02 uppercase font-mono">Tipo</h4>
                <div class="flex flex-wrap gap-2 text-BO3 lg:text-T05">
                    <span v-for="(tipo, index) in data?.tipos" class="opacity-40 cursor-pointer select-none" @click="handleTipos(tipo?.slug)" :class="{ '!opacity-100' : posterStore.tipos.includes(tipo.slug) }">
                        <span>{{ tipo?.name }}</span>
                        <span v-if="index + 1 != data?.tipos?.length">,</span>
                    </span>
                </div>
            </div>  
            <div class="flex flex-col gap-2">
                <h4 class="text-LM02 uppercase font-mono">Año</h4>
                <div class="flex flex-wrap gap-2 text-BO3 lg:text-T05">
                    <span v-for="(fecha, index) in data?.fechas" class="opacity-40 cursor-pointer select-none" @click="handleFechas(fecha?.slug)" :class="{ '!opacity-100' : posterStore.fechas.includes(fecha.slug) }">
                        <span>{{ fecha?.name }}</span>
                        <span v-if="index + 1 != data?.fechas?.length">,</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])
const posterStore = usePosterStore()
const props = defineProps({
    data: Object,
    isOpen: Boolean,
})

const handleTemas = (slug) => {
    if(posterStore.temas.includes(slug)){
        const indice = posterStore.temas.indexOf(slug);
        posterStore.temas.splice(indice, 1)
    } else {
        posterStore.temas.push(slug)
    }
}

const handleFechas = (slug) => {
    if(posterStore.fechas.includes(slug)){
        const indice = posterStore.fechas.indexOf(slug);
        posterStore.fechas.splice(indice, 1)
    } else {
        posterStore.fechas.push(slug)
    }
}
const handleTipos = (slug) => {
    if(posterStore.tipos.includes(slug)){
        const indice = posterStore.tipos.indexOf(slug);
        posterStore.tipos.splice(indice, 1)
    } else {
        posterStore.tipos.splice(0, posterStore.tipos.length);
        posterStore.tipos.push(slug)
    }
}
const clearFilters = () => {
    posterStore.temas.splice(0, posterStore.temas.length);
    posterStore.fechas.splice(0, posterStore.fechas.length);
    posterStore.tipos.splice(0, posterStore.tipos.length);
}

onMounted(() => {
    clearFilters()
})
</script>