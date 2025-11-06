<template>
    <div
        ref="follower"
        class="follower hidden md:block fixed z-50 top-0 left-0 -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0"
    >
        <slot />
    </div>
</template>
<script setup>
import { gsap } from 'gsap'

// to use the mouseFollower in the parent component you have to add the component and pass the icon you want to use as a slot:
// <CommonMouseFollower><MyIcon /></CommonMouseFollower>
const follower = ref(null)
onMounted(() => {
    window.addEventListener('mousemove', move)
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', move)
})

const move = e => {
    if (follower.value) {
        gsap.to(follower.value, {
            x: e.clientX + 10,
            y: e.clientY + 20,
            duration: 0.4,
            ease: 'power2.out',
            opacity: 1,
        })
    }
}


defineExpose({
    move,
})
</script>