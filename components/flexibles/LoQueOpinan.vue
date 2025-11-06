<template>
    <div id="alumni" class="flex flex-col gap-5 lg:gap-10">
        <h2 class="text-T03 lg:text-TK04 font-pkiko px-3 lg:px-6">{{ block?.titulo }}</h2>
        <div class="w-full px-3 lg:px-6 border-t border-g3 pt-4 lg:pt-6 overflow-hidden">
            <div ref="swiperContainer" class="swiper !overflow-visible">
                <div class="swiper-wrapper">
                    <div v-for="(item) in block?.opinion" class="swiper-slide">
                        <div class="relative">
                            <video 
                                class="w-full aspect-[1/1.1] object-cover object-center cursor-pointer"
                                width="1920"
                                :src="item?.video"
                                preload="metadata"
                                @click="actionVideo($event.target, item?.video)"
                            ></video>
                            <div class="absolute bottom-0 pointer-events-none left-0 h-20 bg-gradient-to-t from-[#00000050] to-[#00000000] flex items-end py-4 px-3">
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.8594 8L0.71652 15.7942L0.71652 0.205771L14.8594 8Z" fill="#FDFDFD"/>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-BO4 mt-2">{{ item?.titulo }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div @click="close()" class="fixed top-0 left-0 w-full h-full z-30 bg-[#04040600] backdrop-blur-none transition-all duration-1000 ease-in-out pointer-events-none opacity-0" :class="{ '!opacity-100 !bg-[#04040660] !backdrop-blur-sm !pointer-events-auto' : activeVideo }">
            <video ref="openVideo" class="hidden fixed object-cover object-center z-40 transition-all duration-1000 ease-in-out"
                :src="activeVideoUrl"
            ></video>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    block: Object,
})

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
        slidesPerView: 1.5,
        spaceBetween: 10,
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    })
}

import { useSiteStore } from '../../stores/site'
const openVideo = ref(null)
const siteStore = useSiteStore()
const activeVideo = ref(false)
const activeVideoUrl = ref('')

const close = () => {
    activeVideo.value = false
    openVideo.value.pause();
    siteStore.overflowHidden = false;
    openVideo.value.classList.add('hidden');
    openVideo.value.style.transform = 'translate(0, 0)';
    openVideo.value.classList.add('object-cover');
    openVideo.value.currentTime = 0;
    activeVideoUrl.value = ''
}

const actionVideo = (item, video) => {
    siteStore.overflowHidden = true;
    activeVideoUrl.value = video
    const rect = item.getBoundingClientRect();
    openVideo.value.style.width = `${rect.width}px`;
    openVideo.value.style.height = `${rect.height}px`;
    openVideo.value.style.top = `${rect.top}px`;
    openVideo.value.style.left = `${rect.left}px`;
    openVideo.value.classList.remove('hidden')

    setTimeout(() => {
        activeVideo.value = true;
    }, 200);

    setTimeout(() => {

        if(window.innerWidth > 1023){
            openVideo.value.style.width = window.innerWidth / 3 + 'px';
            openVideo.value.style.height = window.innerHeight / 1.2 + 'px';
        } else {
            openVideo.value.style.width = window.innerWidth / 1.2 + 'px';
            openVideo.value.style.height = window.innerHeight / 1.8 + 'px';
        }

        
        openVideo.value.style.top = '50%';
        openVideo.value.style.left = '50%';
        openVideo.value.style.transform = 'translate(-50%, -50%)';
        
    }, 700);

    setTimeout(() => {
        openVideo.value.play();
    }, 1200); 
    
}

</script>