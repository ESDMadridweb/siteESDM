<script setup>
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
const { data } = await useFetch(`${siteStore.api}/get-animations`)

const restart = ref(true)
const router = useRouter()

const restartAnimation = () => {
  restart.value = false
  setTimeout(() => {
    restart.value = true
  }, 1000);
}

router.afterEach((to, from) => {
    if(to.name.startsWith('index_')){
        restart.value = true
    } else {
        restart.value = false
    }
})

</script>

<template>
  <div v-if="data?.items && data?.items.length > 0" class="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden animation-items">
    <template v-for="(item, index) in data?.items" :key="item.id">
      <CommonImage
        v-if="item?.image"
        class="absolute w-[var(--width)] item top-[var(--topStart)] left-[var(--leftStart)]"
        :class="{'animate': restart}"
        :src="item.image"
        :width="item.width"
        alt="transition"
        @animationend="index === data.items.length - 1 ? restartAnimation() : null"
        :style="{
          '--width': item.width + '%',
          '--leftStart': item.leftstart + '%',
          '--leftEnd': item.leftend + '%',
          '--topStart': item.topstart + '%',
          '--topEnd': item.topend + '%',
          '--timeStart': item.timestart + 'ms',
          '--duration': item.duration + 'ms',
          '--timing': item.timing
        }"
      />
    </template>
  </div>
</template>

<style scoped>
.item.animate {
  animation: anim var(--duration) forwards var(--timeStart) var(--timing);
}
@keyframes anim {
  0% { top: var(--topStart); left: var(--leftStart) }
  100% { top: var(--topEnd); left: var(--leftEnd) }
}
</style>
