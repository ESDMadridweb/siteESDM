<template>
    <div ref="wrapper" class="relative lg:px-6 flex justify-end">
        <div ref="imagesWrapper" class="relative h-[90vh] lg:h-[80vh] w-full lg:w-[58.4%]">
            <img 
                v-for="(image, index) in images"
                width="1920"
                class="h-full object-center object-contain absolute bottom-0 right-0"
                :class="{
                    'left-0 lg:object-bottom bottom-0 w-full !object-cover' : index == 0,
                    'right-0 object-right-bottom lg:object-right-bottom w-3/4' : index == 1,
                    'right-0 object-left-top lg:object-right-bottom w-1/2' : index  == 2
                }"
                :src="image?.sizes?.large"
                :alt="image?.alt"
                :style="{ opacity: index === 0 ? 1 : 0, zIndex: index }"
            >
        </div>
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'



const props = defineProps({
    images: Array,
})

const wrapper = ref(null)
const imagesWrapper = ref(null)
let animation = null;
onMounted(() => {

    const allImages = imagesWrapper.value.querySelectorAll('img');

    animation = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper.value,
            start: "top-=40 top",
            end: `+=${allImages.length * 300}px`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
        }
    });

    allImages.forEach((img, index) => {
        if(index !== 0){
            animation.fromTo(
                img,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power1.inOut" },
                index
            );
        }
    });

})

onUnmounted(() => {
    if (animation) animation.kill();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

</script>