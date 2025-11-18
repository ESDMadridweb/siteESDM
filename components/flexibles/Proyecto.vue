<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 gap-6">
            <div class="col-span-4 flex flex-col gap-6 justify-between">
                <div class="text-BO3">
                    <div v-if="blocks?.socials" v-html="blocks?.socials" class="content" />
                    <h2>{{ blocks?.autor }}</h2>
                    <h3 class="text-g4">{{ blocks?.info_del_autor }}</h3>
                    <h4 v-if="blocks?.extra">{{ blocks?.extra }}</h4>
                    <div class="text-LM02 uppercase flex gap-1 mt-1" :class="{ '!mt-6' : !blocks?.extra }">
                        <div v-for="(tema, index) in temas">
                            <span>{{ tema.name }}</span>
                            <span v-if="temas.length > 1 && index != temas.length - 1">,</span>
                        </div>
                    </div>
                </div>
                <div v-if="blocks?.participantes" v-html="blocks?.participantes" class="text-BO4"></div>
                <div v-if="blocks?.citas && blocks?.citas.length > 0" class="flex flex-col gap-3">
                    <div v-for="(cita, index) in blocks?.citas">
                        <sup class="mr-1 font-bold">{{index + 1}}</sup>
                        <span class="text-BO4">{{ cita?.cita }}</span>
                    </div>
                </div>
            </div>
            <div class="col-span-8 text-T06">
                <CommonTextContent :content="blocks?.descripcion" />
            </div>
        </div>
        <div class="flex flex-col gap-5 my-9 px-3 lg:px-6">
            <CommonImage
                v-for="image in blocks?.galeria"
                class="w-full h-auto object-contain"
                width="1920"
                :src="image?.url" 
                :alt="image?.alt"
            />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    blocks: Object,
    temas: Array,
})
</script>
<style scoped>
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
.content:deep(ul){
    @apply flex flex-col
}
.content:deep(li){
    @apply text-BO4 lg:text-BO3 list-inside list-disc
}
</style>