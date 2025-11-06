<template>
    <div class="bg-green flex items-end fixed right-0 bottom-0 z-10 w-44 p-4 transition-all delay-500 duration-500 ease-in-out" :class="{ '!w-80 !delay-0' : isOpen }">
        <div class="relative w-full">
            <div class="uppercase text-L02 font-mono cursor-pointer select-none" @click="handle()">
                {{ ahoraMismoTitle }}
            </div>
            <div class="absolute right-0 bottom-0 flex gap-1 items-center text-LM02">
                <span>[</span>
                <div ref="pagination" class="swiper-pagination-fraction swiper-pagination-horizontal w-6 -tracking-[3.3px]">
                    <span class="swiper-pagination-current">1</span>
                    /
                    <span class="swiper-pagination-total">{{ totalSlides }}</span>
                </div>
                <span>]</span>
            </div>
            <div class="grid grid-rows-[0fr] transition-all duration-500 delay-0 ease-in-out" :class="{ '!grid-rows-[1fr] !delay-500' : isOpen }">
                <div ref="swiperContainer" class="swiper w-full !flex flex-col gap-12">
                    <div class="swiper-wrapper">
                        <div v-for="link in ahoraMismoLinks" class="swiper-slide text-BO3 py-4">
                            <NuxtLink :to="link?.link?.url" :target="link?.link?.target">
                                {{ link?.link?.title }}
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 select-none">
                        <div class="swiper-prev cursor-pointer swiper-button-disabled">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4681 5.80409L4.93479 11.3308H21.3281V12.6641H4.93479L10.4681 18.1908L9.52146 19.1374L2.38813 11.9974L9.52146 4.85742L10.4681 5.80409Z" fill="#040406"/>
                            </svg>
                        </div>
                        <div class="swiper-next cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5319 5.80409L19.0652 11.3308H2.67188V12.6641H19.0652L13.5319 18.1908L14.4785 19.1374L21.6119 11.9974L14.4785 4.85742L13.5319 5.80409Z" fill="#040406"/>
                            </svg>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore()
const { locale } = useI18n()

const { data: ahoraMismoES } = await useFetch(`${siteStore.api}/get-nowinfo?lang=es`)
const { data: ahoraMismoEN } = await useFetch(`${siteStore.api}/get-nowinfo?lang=en`)

const ahoraMismoTitle = computed(() => {
    return locale.value == 'es'
    ? ahoraMismoES?.value?.title
    : ahoraMismoEN?.value?.title
})

const ahoraMismoLinks = computed(() => {
    return locale.value == 'es'
    ? ahoraMismoES?.value?.links
    : ahoraMismoEN?.value?.links
})

import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'

const isOpen = ref(true)
const totalSlides = ref(3)

const handle = () => {
    isOpen.value = !isOpen.value
}

const close = () => {
    isOpen.value = false
    window.removeEventListener('scroll', close)
}

const swiperContainer = ref(null)
let swiper = null
const pagination = ref(null)

onMounted(() => {
    totalSlides.value = ahoraMismoLinks?.value?.length
    initSwiper()

    window.addEventListener('scroll', close)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', close)
    if (swiper) {
        swiper.destroy()
    }
})

const initSwiper = () => {
    swiper = new Swiper(swiperContainer.value, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        pagination: {
            el: pagination.value,
            type: 'fraction',
        },

    })
}

</script>

<style>
.swiper-button-disabled{
    @apply opacity-40
}
</style>