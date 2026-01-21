<template>
    <div class="relative">
        <PosterAnimation ref="animation" :stateLoad="stateLoad" />
        <PosterWrapper :mode="mode" :stateLoad="stateLoad">
            <PosterProjects :projects="posterData?.poster" :mode="mode" />
        </PosterWrapper>
        <PosterFilters 
            :data="posterData" 
            :isOpen="openFilters" 
            @close="openFilters = false" 
        />
        <NuxtPage 
            :page-key="route => route.fullPath" 
        />
        <PosterFooter 
            ref="filter"
            :stateLoad="stateLoad"
            :mode="mode"
            @openFilter="openFilters = true"
            @galleryMode="mode = 'Galeria'"
            @listMode="mode = 'Listado'"
        />
        <div v-if="mode == 'Galeria'" class="absolute bottom-0 left-1/2 -translate-x-1/2 -z-20 hidden lg:flex gap-4 border px-4 py-2 rounded-full bg-black text-white transition-opacity duration-300 ease-in-out" :class="{'!opacity-0 !pointer-events-none' : !showHelper}">
            <svg class="fill-white" fill="none" height="24" stroke-width="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12.5303 4.46967C12.2374 4.17678 11.7626 4.17678 11.4697 4.46967L12 5ZM12 13L11.4697 13.5303C11.7626 13.8232 12.2374 13.8232 12.5303 13.5303L12 13ZM9.46967 6.46967C9.17678 6.76256 9.17678 7.23744 9.46967 7.53033C9.76256 7.82322 10.2374 7.82322 10.5303 7.53033L9.46967 6.46967ZM13.4697 7.53033C13.7626 7.82322 14.2374 7.82322 14.5303 7.53033C14.8232 7.23744 14.8232 6.76256 14.5303 6.46967L13.4697 7.53033ZM10.5303 10.4697C10.2374 10.1768 9.76256 10.1768 9.46967 10.4697C9.17678 10.7626 9.17678 11.2374 9.46967 11.5303L10.5303 10.4697ZM14.5303 11.5303C14.8232 11.2374 14.8232 10.7626 14.5303 10.4697C14.2374 10.1768 13.7626 10.1768 13.4697 10.4697L14.5303 11.5303ZM3.25 10V14H4.75V10H3.25ZM20.75 14V10H19.25V14H20.75ZM11.25 5V13H12.75V5H11.25ZM11.4697 4.46967L9.46967 6.46967L10.5303 7.53033L12.5303 5.53033L11.4697 4.46967ZM11.4697 5.53033L13.4697 7.53033L14.5303 6.46967L12.5303 4.46967L11.4697 5.53033ZM12.5303 12.4697L10.5303 10.4697L9.46967 11.5303L11.4697 13.5303L12.5303 12.4697ZM12.5303 13.5303L14.5303 11.5303L13.4697 10.4697L11.4697 12.4697L12.5303 13.5303ZM20.75 10C20.75 5.16751 16.8325 1.25 12 1.25V2.75C16.0041 2.75 19.25 5.99594 19.25 10H20.75ZM12 22.75C16.8325 22.75 20.75 18.8325 20.75 14H19.25C19.25 18.0041 16.0041 21.25 12 21.25V22.75ZM3.25 14C3.25 18.8325 7.16751 22.75 12 22.75V21.25C7.99594 21.25 4.75 18.0041 4.75 14H3.25ZM4.75 10C4.75 5.99594 7.99594 2.75 12 2.75V1.25C7.16751 1.25 3.25 5.16751 3.25 10H4.75Z"/>
            </svg>
            <div class="text-BO3">{{ t("Keep scrolling") }}</div>
        </div>
    </div>
</template>

<script setup>
import { useSeoObject } from '../composables/seo';
import { useSiteStore } from '../../stores/site';

const route = useRoute()
const bodyClass = route.name
const siteStore = useSiteStore()

const { locale, t } = useI18n()
const { data: posterData } = await useFetch(`${siteStore.api}/get-poster?lang=${locale.value}`)
const { data: posterPageData} = await useFetch(`${siteStore.api}/get-archive?type=poster&lang=${locale.value}`)
const mode = ref('Galeria')

const openFilters = ref(false)

const showHelper = ref(false)
const filter = ref(null)
const stateLoad = ref(0)
const animation = ref(null)

onMounted(() => {
    setTimeout(() => {
        stateLoad.value = 1
    }, 1000);
    setTimeout(() => {
        stateLoad.value = 2
    }, 2500);
    setTimeout(() => {
        stateLoad.value = 3
    }, 3500);
    setTimeout(() => {
        animation.value.$el.style.height = filter.value.$el.offsetHeight + 'px'
    }, 4500);
    setTimeout(() => {
        stateLoad.value = 4
    }, 5500);
    setTimeout(() => {
        stateLoad.value = 5
        showHelper.value = true
        const handleWheel = () => {
            showHelper.value = false
            document.removeEventListener('wheel', handleWheel)
        }
        document.addEventListener('wheel', handleWheel)
    }, 5800)

})

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

useSeoObject(posterPageData?.value?.seo)
</script>
