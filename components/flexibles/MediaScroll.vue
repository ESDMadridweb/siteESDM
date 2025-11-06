<template>
    <div class="w-full">
        <div ref="wrapper" class="p-3 lg:p-6" style="width: 25%">
            <div class="relative w-fit">
                <video 
                    v-if="block?.video" 
                    ref="video"
                    :src="block?.video" 
                    autoplay 
                    loop 
                    muted 
                    playsinline 
                    width="1920" 
                    class="w-full max-h-[calc(100svh-4rem)] object-contain object-left"
                    :poster="block?.imagen?.sizes?.large"
                >
                </video>
                <img
                    v-else
                    :src="block?.imagen?.sizes?.large" 
                    :alt="block?.imagen?.alt" 
                    width="1920"
                    class="w-full max-h-[calc(100svh-4rem)] object-contain object-left"
                >
                <div v-if="video" class="absolute bottom-0 right-0 p-2 cursor-pointer m-1 bg-black/30 rounded-full backdrop-blur-sm" @click="handleMuted()">
                    <svg v-if="!isMuted" class="w-8 h-8 fill-white" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M232,416a23.88,23.88,0,0,1-14.2-4.68,8.27,8.27,0,0,1-.66-.51L125.76,336H56a24,24,0,0,1-24-24V200a24,24,0,0,1,24-24h69.75l91.37-74.81a8.27,8.27,0,0,1,.66-.51A24,24,0,0,1,256,120V392a24,24,0,0,1-24,24ZM125.82,336Zm-.27-159.86Z"/><path d="M320,336a16,16,0,0,1-14.29-23.19c9.49-18.87,14.3-38,14.3-56.81,0-19.38-4.66-37.94-14.25-56.73a16,16,0,0,1,28.5-14.54C346.19,208.12,352,231.44,352,256c0,23.86-6,47.81-17.7,71.19A16,16,0,0,1,320,336Z"/>
                        <path d="M368,384a16,16,0,0,1-13.86-24C373.05,327.09,384,299.51,384,256c0-44.17-10.93-71.56-29.82-103.94a16,16,0,0,1,27.64-16.12C402.92,172.11,416,204.81,416,256c0,50.43-13.06,83.29-34.13,120A16,16,0,0,1,368,384Z"/><path d="M416,432a16,16,0,0,1-13.39-24.74C429.85,365.47,448,323.76,448,256c0-66.5-18.18-108.62-45.49-151.39a16,16,0,1,1,27-17.22C459.81,134.89,480,181.74,480,256c0,64.75-14.66,113.63-50.6,168.74A16,16,0,0,1,416,432Z"/>
                    </svg>
                    <svg v-if="isMuted" class="w-8 h-8 fill-white" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                        <line style="fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px" x1="416" x2="64" y1="432" y2="80"/>
                        <path d="M243.33,98.86a23.89,23.89,0,0,0-25.55,1.82l-.66.51L188.6,124.54a8,8,0,0,0-.59,11.85l54.33,54.33A8,8,0,0,0,256,185.06V120.57A24.51,24.51,0,0,0,243.33,98.86Z"/>
                        <path d="M251.33,335.29,96.69,180.69A16,16,0,0,0,85.38,176H56a24,24,0,0,0-24,24V312a24,24,0,0,0,24,24h69.76l92,75.31A23.9,23.9,0,0,0,243.63,413,24.51,24.51,0,0,0,256,391.45V346.59A16,16,0,0,0,251.33,335.29Z"/>
                        <path d="M352,256c0-24.56-5.81-47.87-17.75-71.27a16,16,0,1,0-28.5,14.55C315.34,218.06,320,236.62,320,256q0,4-.31,8.13a8,8,0,0,0,2.32,6.25l14.36,14.36a8,8,0,0,0,13.55-4.31A146,146,0,0,0,352,256Z"/>
                        <path d="M416,256c0-51.18-13.08-83.89-34.18-120.06a16,16,0,0,0-27.64,16.12C373.07,184.44,384,211.83,384,256c0,23.83-3.29,42.88-9.37,60.65a8,8,0,0,0,1.9,8.26L389,337.4a8,8,0,0,0,13.13-2.79C411,311.76,416,287.26,416,256Z"/>
                        <path d="M480,256c0-74.25-20.19-121.11-50.51-168.61a16,16,0,1,0-27,17.22C429.82,147.38,448,189.5,448,256c0,46.19-8.43,80.27-22.43,110.53a8,8,0,0,0,1.59,9l11.92,11.92A8,8,0,0,0,452,385.29C471.6,344.9,480,305,480,256Z"/>
                    </svg>
                </div>  
            </div>
        </div>
    </div>
    
</template>
<script setup>
import gsap from 'gsap';

const props = defineProps({
    block: Object,
})

const video = ref(null)
const wrapper = ref(null)
let animation = null;

const isMuted = ref(true)

const handleMuted = () => {
    if(video.value){
        video.value.muted = !video.value.muted
        isMuted.value = video.value.muted
    }
}

onMounted(() => {
    animation = gsap.to(wrapper.value, {
        width: '100%',
        scrollTrigger: {
            trigger: wrapper.value,
            start: `${(window.innerWidth >= 1024) ? 'bottom+=40' : 'bottom+=200' } bottom`,
            end: `+=${(window.innerWidth >= 1024) ? '1000' : '600' }`,
            scrub: true,
        },
    });
})

onBeforeUnmount(() => {
  if (animation?.scrollTrigger) {
    animation.scrollTrigger.kill()
  }
  animation?.kill()
})


</script>