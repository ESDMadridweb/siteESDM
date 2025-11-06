<template>
    <div ref="wrapper" class="h-[200svh]">
        <div class="lg:py-20 lg:text-center flex flex-col justify-center gap-8 lg:gap-10 px-3 lg:px-6 min-h-svh top-0 sticky">
            <h3 class="text-BO3">{{ block?.titulo }}</h3>
            <div class="flex flex-col text-T03 lg:text-TK03 font-pkiko">
                <div 
                    v-for="(item, index) in block?.temas" 
                    :class="{ 'text-blue' : elementActive == index }"
                    class="select-none element"
                >
                    {{ item?.titulo }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  block: Object,
})
const wrapper = ref(null)
const elementActive = ref(-1)

function checkPosition() {
    if (!wrapper.value || !props.block?.temas?.length) return

    const sectionHeight = Math.floor(
        (wrapper.value.offsetHeight - window.innerHeight) / props.block.temas.length
    )

    const scrollPos = window.scrollY - wrapper.value.offsetTop

    if (scrollPos >= 0) {
        elementActive.value = Math.min(
            props.block.temas.length - 1,
            Math.floor(scrollPos / sectionHeight)
        )
    } else {
        elementActive.value = -1
    }
}

onMounted(() => {
    window.addEventListener('scroll', checkPosition)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkPosition)
})
</script>