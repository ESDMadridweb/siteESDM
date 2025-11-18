<template>
    <div>
        <CommonWrapperScrollHorizontal class="hidden lg:flex" :fullscreen="false">
            <div 
                v-for="(proyecto, index) in block?.proyectos" 
                class="swiper-slide !w-fit !h-fit"
                :class="{
                    'lg:h-[480px]' : index % 3 == 0,
                    'lg:h-[400px]' : index % 3 == 1,
                    'lg:h-[320px]' : index % 3 == 2,
                }"
                @click="handleData(proyecto?.data)"
                @mouseenter="
                    cursorStore.active = true;
                    cursorStore.title = proyecto?.data?.autor;
                    cursorStore.subtitle = proyecto?.data?.titulo;
                    posterStore.setPauseTrue()
                "
                @mouseleave="
                    cursorStore.active = false;
                    cursorStore.title = '';
                    cursorStore.subtitle = '';
                    posterStore.setPauseFalse()
                "
            >
                <div>
                    <CommonImage
                        :src="proyecto?.data?.image" 
                        :alt="proyecto?.data?.titulo" 
                        class="max-w-[70vw] lg:max-w-full w-auto h-full object-contain cursor-pointer"
                        :class="{
                            'max-h-[480px]' : index % 3 == 0,
                            'max-h-[400px]' : index % 3 == 1,
                            'max-h-[320px]' : index % 3 == 2,
                        }"
                    />
                </div>
            </div>
        </CommonWrapperScrollHorizontal>
        <div ref="swiperContainer" class="swiper lg:!hidden">
            <div class="swiper-wrapper items-center">
                <div 
                    v-for="proyecto in block?.proyectos" 
                    class="swiper-slide !w-fit max-w-[70vw] max-h-[400px] lg:max-w-[600px] lg:max-h-[700px]"
                    @click="handleData(proyecto?.data)"
                    @mouseenter="
                        cursorStore.active = true;
                        cursorStore.title = proyecto?.data?.autor;
                        cursorStore.subtitle = proyecto?.data?.titulo;
                    "
                    @mouseleave="
                        cursorStore.active = false;
                        cursorStore.title = '';
                        cursorStore.subtitle = '';
                    "
                >
                    <div>
                        <CommonImage
                            :src="proyecto?.data?.image" 
                            :alt="proyecto?.data?.titulo" 
                            class="w-auto h-full object-contain"
                        />
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
import Swiper from 'swiper'
import { FreeMode } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/free-mode';

const props = defineProps({
    block: Object,
})

const { locale } = useI18n()
const posterStore = usePosterStore()
const cursorStore = useCursorStore()
const siteStore = useSiteStore()
const setData = ref(null)

const handleData = (data) => {
    siteStore.overflowHidden = true
    setData.value = data
    animation.value = true
    setTimeout(() => {
         posterStore.setPauseTrue()
    }, 1);
}

const cleanData = () => {
    siteStore.overflowHidden = false
    animation.value = false
     posterStore.setPauseFalse()
    setTimeout(() => {
        setData.value = null
    }, 500);
}

const animation = ref(false)

const swiperContainer = ref(null)
let swiper = null

onMounted(() => {
    initSwiper()
    setTimeout(() => {
        posterStore.setPauseFalse()
    }, 1000);
})

onUnmounted(() => {
    cursorStore.active = false;
    cursorStore.text = '';
    if (swiper) {
        swiper.destroy()
    }
})

const initSwiper = () => {
    swiper = new Swiper(swiperContainer.value, {
        modules: [FreeMode],
        slidesPerView: "auto",
        freeMode: true,
        speed: 1500,
    })
}

</script>