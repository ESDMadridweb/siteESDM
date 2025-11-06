<template>
    <header class="w-full flex justify-between items-center px-3 lg:px-6 py-[17px]">
        <CommonHeaderLogo />
        <CommonHeaderOptions />
        <div class="fixed top-0 left-0 w-full h-screen bg-[#04040660] z-30 backdrop-blur-sm transition-opacity opacity-100 duration-300 ease-in-out pointer-events-none" :class="{ '!opacity-0' : !menuStore.isOpened }"></div>
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

const route = useRoute()
watch(
    () => route.path,
    () => {
        wrapperMenu.value.$el.classList.add('translate-x-full')
        menuStore.isOpened = false;
    }
)

</script>
