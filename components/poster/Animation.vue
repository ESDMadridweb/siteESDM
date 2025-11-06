<template>
    <div 
        v-if="stateLoad < 5 || true"
        class="font-pkiko text-[35vw] flex justify-center items-end tracking-[-10px] lg:tracking-[-20px] text-center h-svh w-full fixed -z-10 bottom-0 left-0 bg-green translate-y-full transition-all duration-1000 ease-in-out overflow-hidden" 
        :class="{ 
            '!translate-y-0' : stateLoad > 0,
        }"
    >
        <div class="relative z-10 -translate-y-[35vh] lg:translate-y-0">
            <span v-if="locale == 'es'">Pós</span>
            <span v-if="locale == 'en'">Pos</span>
            <span class="relative">
                <span :class="{ 'opacity-0' : stateLoad > 2 }">t</span>
                <span v-if="stateLoad > 2" class="italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">t</span>
            </span>
            <span>er</span>
        </div>
        <div 
            ref="greenEffect" 
            class="absolute top-0 left-0 h-full w-full z-20 bg-green transition-all duration-1000 ease-in-out" 
            :class="{ '!h-[0px]' : stateLoad > 1 }"
        />
    </div>
</template>
<script setup>
const { locale } = useI18n()
defineProps({
    stateLoad: Number
})

const greenEffect = ref(null)

onMounted(() => {
    greenEffect.value.style.height = window.innerHeight + 'px'
})
</script>