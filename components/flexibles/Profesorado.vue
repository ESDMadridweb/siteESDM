<template>
    <div id="profesorado" class="flex flex-col gap-5 lg:gap-10">
        
        <h2 class="text-T03 lg:text-TK04 font-pkiko px-3 lg:px-6">{{ block?.titulo }}</h2>
        <div class="border-t border-g3 px-3 lg:px-6 grid grid-cols-2 lg:grid-cols-4 gap-x-2 lg:gap-x-16 gap-y-5 pt-4 lg:pt-6">
            <div v-for="item in block?.profesorado" class="group text-BO3 relative cursor-pointer" @click="handleData(item?.data)">
                <h3 class="group-hover:text-blue transition-colors duration-300 ease-in-out">{{ item?.data?.title }}</h3>
                <h4 class="text-g4 group-hover:text-blue transition-colors duration-300 ease-in-out">{{ item?.cargo }}</h4>
                <CommonImage
                    v-if="item?.data?.image"
                    class="hidden lg:block absolute right-0 -top-20 w-40 h-60 group-hover:!opacity-100 object-cover opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none"
                    width="480"
                    :src="item?.data?.image" 
                    :alt="item?.data?.title"
                />
                <div v-else class="hidden lg:flex items-end absolute right-0 -top-20 bg-lila w-40 h-60 group-hover:!opacity-100 object-cover opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none">
                    <div class="text-T03 font-pkiko p-2">{{ getInitials(item?.data?.title) }}</div>
                </div>
            </div>
        </div>

        <div class="fixed top-0 left-0 w-full h-screen z-[99] overflow-x-hidden opacity-0 pointer-events-none not-scrollbar" :class="{ '!opacity-100 !pointer-events-auto' : setData }">
            <div @click="cleanData()" class="fixed top-0 left-0 w-full h-full bg-[#04040600] backdrop-blur-0 transition-all duration-500 ease-in-out" :class="{ '!bg-[#04040660] !backdrop-blur-sm' : animation }"></div>
            <div data-lenis-prevent class="bg-white absolute top-24 lg:top-0 right-0 w-full min-h-screen lg:w-4/5 z-20 translate-y-full lg:translate-y-0 lg:translate-x-full transition-transform duration-500 ease-in-out" :class="{ 'lg:!translate-x-0 !translate-y-0' : animation }" >
                <div class="text-BO3 relative w-full flex justify-end py-3 px-4">
                    <div @click="cleanData()" class="cursor-pointer">
                        {{ locale == 'es' ? 'Cerrar' : 'Close' }}
                    </div>
                </div>
                <ModalsTeam :data="setData" />
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore()

const props = defineProps({
    block: Object,
})

const setData = ref(null)

const handleData = (data) => {
    siteStore.overflowHidden = true
    setData.value = data
    animation.value = true
}

const cleanData = () => {
    siteStore.overflowHidden = false
    animation.value = false
    setTimeout(() => {
        setData.value = null
    }, 500);
}

const animation = ref(false)

const { locale } = useI18n()

function getInitials(name) {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}

</script>