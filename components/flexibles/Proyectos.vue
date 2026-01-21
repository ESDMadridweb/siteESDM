<template>
    <div id="proyectos" class="flex flex-col gap-5 lg:gap-10">
        
        <h2 class="text-T03 lg:text-TK04 font-pkiko px-3 lg:px-6">{{ block?.titulo }}</h2>
        <div class="border-t border-g3 px-3 lg:px-6 hidden lg:grid grid-cols-3 pt-4 lg:pt-6">
            <template v-for="(item, i) in block?.proyectos">
                <div 
                    @click="handleData(item?.data)"
                    class="w-full flex flex-col gap-2 cursor-pointer"
                    @mouseenter="
                        cursorStore.active = true;
                        cursorStore.text = t('Read');
                    " 
                    @mouseleave="
                        cursorStore.active = false;
                        cursorStore.text = '';
                    "
                >
                    <CommonImage
                        width="1024"
                        class="w-full object-contain"
                        :src="item?.data?.image" 
                        :alt="item?.data?.title"
                    />
                    <h3 class="text-BO4">{{ item?.data?.content?.autor }} · {{ item?.data?.title }}</h3>
                </div>
            </template>
        </div>

        <div class="lg:hidden w-full border-t border-g3 py-3 overflow-hidden">
            <div class="px-3">
                <div ref="swiperContainer" class="swiper !overflow-visible">
                    <div class="swiper-wrapper">
                        <div 
                            v-for="(item, index) in block?.proyectos" 
                            @click="handleData(item?.data)"
                            class="swiper-slide !flex flex-col gap-2 cursor-pointer" 
                            :class="{ 'pr-[10px]' : index != block?.proyectos.length - 1}"
                        >
                            <CommonImage
                                width="1024"
                                class="w-full object-contain"
                                :src="item?.data?.image" 
                                :alt="item?.data?.title"
                            />
                            <h3 class="text-L02">{{ item?.data?.content?.autor }} · {{ item?.data?.title }}</h3>
                        </div>
                    </div>
                </div>
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
                <ModalsPoster :data="setData" />
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore()

const cursorStore = useCursorStore()

const props = defineProps({
    block: Object,
})

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

const { locale, t } = useI18n()

import Swiper from 'swiper'
import 'swiper/css'

const swiperContainer = ref(null)
let swiper = null

onMounted(() => {
    initSwiper()
})

onBeforeUnmount(() => {
    if (swiper) {
        swiper.destroy()
    }
})

const initSwiper = () => {
    swiper = new Swiper(swiperContainer.value, {
        slidesPerView: 1.2,
    })
}

</script>