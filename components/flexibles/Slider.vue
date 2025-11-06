<template>
    <div 
        :id="block?.titulo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')"
        @mouseenter="
            cursorStore.active = true;
            cursorStore.text = Desliza;
        " 
        @mouseleave="
            cursorStore.active = false;
            cursorStore.text = '';
        "
    >  
        <h2 v-if="block?.titulo" class="font-pkiko text-T03 lg:text-TK04 px-3 lg:px-6 pb-5 lg:pb-10 border-b border-gray mb-4 lg:mb-6">{{ block?.titulo }}</h2>
        <div ref="swiperContainer" class="swiper h-[480px] lg:h-[648px]">
            <div class="swiper-wrapper h-full">
                <div class="swiper-slide !w-fit h-full" v-for="(slide, index) in block?.imagenes" :class="{ 'pl-[10px]' : index != 0 }">
                    <img 
                        width="1920"
                        class="h-full w-auto"
                        :src="slide?.sizes?.large" 
                        :alt="slide?.alt"
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Swiper from 'swiper'
import 'swiper/css'

const { locale } = useI18n()

const Desliza = computed(() => (locale.value === 'es' ? 'Desliza' : 'Drag'))

const cursorStore = useCursorStore()

const props = defineProps({
    block: Object,
})

const swiperContainer = ref(null)
let swiper = null

onMounted(() => {
    initSwiper()
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
        slidesPerView: "auto",
    })
}


</script>