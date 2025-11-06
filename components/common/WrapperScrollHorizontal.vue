<template>
    <div ref="scrollContainer" data-lenis-prevent class="flex flex-col lg:flex-row items-center lg:overflow-auto not-scrollbar"
      :class="{ 
        'lg:h-[calc(100vh-8rem)]' : fullscreen,
        'lg:h-[480px] my-20' : !fullscreen,
      }"
    >
        <slot />
        <slot v-if="isDesktop" />
    </div>
</template>
<script setup>

defineProps({
  fullscreen: {
    type: Boolean,
    default: true,
  }
})

const scrollContainer = ref(null)
const isDesktop = ref(false)
const posterStore = usePosterStore()
posterStore.setPauseFalse()

let animationId
let handleWheel
let container
let current = 0
let target = 0
const speed = 1

onMounted(() => {
  isDesktop.value = window.innerWidth >= 1024
  container = scrollContainer.value
  if (!container) return

  const animate = () => {
    current = container.scrollLeft
    if (!posterStore.pause) {

      if (current >= container.scrollWidth / 2) {
        container.scrollLeft = 0
        current = 0
        target = 0
      }

      target += speed
    }

    container.scrollLeft += (target - current) * 0.1

    animationId = requestAnimationFrame(animate)
  }

  animate()

  handleWheel = (e) => {
    if (window.innerWidth >= 1024 && e.deltaY !== 0) {
      e.preventDefault()
      target += e.deltaY
    }
  }

  container.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (container && handleWheel) {
    container.removeEventListener('wheel', handleWheel)
  }
})
</script>