<script setup>
import { ref, onMounted, nextTick } from 'vue'

const items = [
  {
    image: 'ladrillo.png',
    width: '50%',
    topStart: '-25%',
    leftStart: '100%',
    topEnd: '100%',
    leftEnd: '-100%'
  },
  {
    image: 'ladrillo.png',
    width: '50%',
    topStart: '-25%',
    leftStart: '-50%',
    topEnd: '100%',
    leftEnd: '100%'
  },
  {
    image: 'ladrillo.png',
    width: '50%',
    topStart: '100%',
    leftStart: '-50%',
    topEnd: '-25%',
    leftEnd: '100%'
  },
  {
    image: 'ladrillo.png',
    width: '50%',
    topStart: '100%',
    leftStart: '50%',
    topEnd: '-25%',
    leftEnd: '-50%'
  },
]

const activeItem = ref(null)
const route = useRoute()
const router = useRouter()
const isAnimating = ref(false)

const animateRandomItem = async () => {

    if(!route.name.startsWith('index')) return
    if(isAnimating.value) return

    const randomIndex = Math.floor(Math.random() * items.length)
    activeItem.value = { ...items[randomIndex], id: Date.now() }
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
      <img 
        v-if="activeItem"
        :key="activeItem.id"
        class="absolute animate-fly"
        :src="activeItem.image"
        :width="activeItem.width"
        :style="{
          '--leftStart': activeItem.leftStart,
          '--leftEnd': activeItem.leftEnd,
          '--topStart': activeItem.topStart,
          '--topEnd': activeItem.topEnd
        }"
      >
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