<template>
    <NuxtLink 
        :to="`${(locale === 'es')?'/poster/':'/en/poster/'}${post?.slug}`" 
        class="block"
        @mouseenter="posterStore.setPauseTrue()"
        @mouseleave="posterStore.setPauseFalse()"
        :class="{
            'w-full aspect-[1/1.33]' : mode == 'Listado',
            'shrink-0' : mode == 'Galeria'
        }"
    >
        <template v-if="post?.tipo[0]?.slug == 'proyectos'">
            <CommonImage
                width="1024"
                class="w-auto object-contain"
                :class="{ 
                    'mx-auto lg:mx-0' : mode == 'Galeria',
                    'max-w-[90vw] max-h-[480px] lg:max-h-[480px]' : mode == 'Galeria' && index % 3 == 0,
                    'max-w-[85vw] max-h-[400px] lg:max-h-[400px]' : mode == 'Galeria' && index % 3 == 1,
                    'max-w-[80vw] max-h-[320px] lg:max-h-[320px]' : mode == 'Galeria' && index % 3 == 2,
                }"
                :src="post?.image" 
                :alt="post?.title"
                @mouseenter="
                    cursorStore.active = true;
                    cursorStore.title = post?.content?.autor;
                    cursorStore.subtitle = post?.title;
                "
                @mouseleave="
                    cursorStore.active = false;
                    cursorStore.title = '';
                    cursorStore.subtitle = '';
                "
            />
        </template>
        <template v-else>
            <div class="bg-green p-3 flex flex-col justify-between w-full h-full transition-colors duration-300 ease-in-out overflow-hidden" 
                :class="{ 
                    'hover:bg-blue aspect-[1/1.33] max-w-[80vw]' : mode == 'Galeria',
                    'max-h-[480px] lg:h-[480px] gallery-item-type-1' : mode == 'Galeria' && index % 3 == 0,
                    'max-h-[400px] lg:h-[400px] gallery-item-type-2' : mode == 'Galeria' && index % 3 == 1,
                    'max-h-[320px] lg:h-[320px] gallery-item-type-3' : mode == 'Galeria' && index % 3 == 2,
                }" 
                @mouseenter="
                    cursorStore.active = true;
                    cursorStore.title = post?.content?.autor;
                    cursorStore.subtitle = post?.title;
                "
                @mouseleave="
                    cursorStore.active = false;
                    cursorStore.title = '';
                    cursorStore.subtitle = '';
                "    
            >
                <div class="flex flex-col">
                    <h3 class="text-BO4 lg:text-BO3 capitalize" :class="{ 'text-[12px] lg:text-L02' : mode == 'Listado' }">{{ post?.content?.autor }}</h3>
                    <h3 class="text-[10px] lg:text-L02 uppercase lg:w-2/3" :class="{ 'text-[10px] lg:text-[8px]' : mode == 'Listado' }">{{ post?.content?.info_del_autor }}</h3>
                </div>
                <div v-html="post?.text" class="font-pkiko thisText normal-case" :class="{ 'text-[15px] lg:text-BO4' : mode == 'Listado' }" />
            </div>
        </template>
    </NuxtLink>
</template>

<script setup>
defineProps({
    post: Object,
    mode: String,
    index: Number,
    notLinkSingle: {
        type: Boolean,
        default: false
    }
})
const posterStore = usePosterStore()
const cursorStore = useCursorStore()
const { locale } = useI18n()
</script>

<style scoped>
.gallery-item-type-1 .thisText{
    @apply text-BO2 lg:text-T04
}
.gallery-item-type-2 .thisText{
    @apply text-BO2 lg:text-T04
}
.gallery-item-type-3 .thisText{
    @apply text-BO2 lg:text-T05
}
</style>