<template>
    <div class="bg-green fixed z-20 bottom-0 left-0 w-full flex justify-between px-3 lg:px-6 py-2 select-none" :class="{ '!pointer-events-none !opacity-0' : stateLoad < 4 }">
        <div class="text-BO4 cursor-pointer" @click="emit('openFilter')">Filtrar</div>
        <div class="flex items-center gap-2 text-BO4">
            <span class="text-LM02 uppercase pt-[2px]">Ver:</span>
            <span class="cursor-pointer" @click="emit('galleryMode')" :class="{ 'opacity-40' : mode != 'Galeria' }">Galeria</span>
            <span class="cursor-pointer" @click="emit('listMode')" :class="{ 'opacity-40' : mode != 'Listado' }">Listado</span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    stateLoad: Number,
    mode: String,
})
const emit = defineEmits(['openFilter', 'galleryMode', 'listMode'])
</script>