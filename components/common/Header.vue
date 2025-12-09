<template>
    <header ref="header" class="w-full flex justify-between items-center px-3 lg:px-6 py-[17px]" :class="{'sticky top-0 left-0 z-50 bg-white' : isScrollingUp}">
        <CommonHeaderLogo />
        <CommonHeaderOptions />
        <div class="fixed top-0 left-0 w-full h-screen bg-[#04040660] z-30 backdrop-blur-sm transition-opacity opacity-100 duration-300 ease-in-out" @click="onClick" :class="{ '!opacity-0 !pointer-events-none' : !menuStore.isOpened }"></div>
        <CommonHeaderWrapperMenu ref="wrapperMenu">
            <CommonHeaderInfo />
            <CommonHeaderMenu />
        </CommonHeaderWrapperMenu>
    </header>
</template>

<script setup>
import { useMenuStore } from '../../stores/menu';
const menuStore = useMenuStore()

const wrapperMenu = ref(null)

const onClick = () => {
    wrapperMenu.value.$el.classList.add('translate-x-full')
    menuStore.isOpened = false;
}

const route = useRoute()
watch(
    () => route.path,
    () => {
        wrapperMenu.value.$el.classList.add('translate-x-full')
        menuStore.isOpened = false;
    }
)

const isScrollingUp = ref(false)
let lastScrollY = 0

const handleScroll = () => {
    const currentScrollY = window.scrollY
    isScrollingUp.value = currentScrollY < lastScrollY
    lastScrollY = currentScrollY
}

onMounted(() => {
    lastScrollY = window.scrollY
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>
