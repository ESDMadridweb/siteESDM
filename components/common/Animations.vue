<script setup>
import { useSiteStore } from '@/stores/site';

const siteStore = useSiteStore()
const { data: data } = await useFetch(`${siteStore.api}/get-animations`)

const activeItem = ref(null)
const route = useRoute()
const router = useRouter()
const isAnimating = ref(false)

const animateRandomItem = async () => {

    if(!route.name.startsWith('index')) return
    if(isAnimating.value) return
    
    const randomIndex = Math.floor(Math.random() * data?.value?.items?.length)
    activeItem.value = { ...data?.value?.items[randomIndex], id: Date.now() }
    isAnimating.value = true
    setTimeout(() => {
        isAnimating.value = false
        setTimeout(() => {
            activeItem.value = null
            animateRandomItem()
        }, 2500);
    }, 5000)
}

router.afterEach((to, from) => {
    if(to.name.startsWith('index')){
        setTimeout(() => {
            animateRandomItem()
        }, 2500); 
    }
})

onMounted(() => {
  animateRandomItem()
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden">
    <transition name="fly">
      <CommonImage
        v-if="activeItem"
        :key="activeItem.id"
        class="absolute animate-fly w-[var(--width)]"
        :src="activeItem.image"
        :width="activeItem.width"
        alt="transition"
        :style="{
          '--width': activeItem?.width + '%',
          '--leftStart': activeItem.leftstart + '%',
          '--leftEnd': activeItem.leftend + '%',
          '--topStart': activeItem.topstart + '%',
          '--topEnd': activeItem.topend + '%'
        }"
      />
    </transition>
  </div>
</template>

<style scoped>
@keyframes fly {
  from {
    top: var(--topStart);
    left: var(--leftStart);
    transform: scale(1);
  }
  to {
    top: var(--topEnd);
    left: var(--leftEnd);
    transform: scale(0.8);
  }
}

.animate-fly {
  position: absolute;
  animation: fly 5s ease-in-out forwards;
}
</style>