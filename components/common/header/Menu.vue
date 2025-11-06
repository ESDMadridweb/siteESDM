<template>
    <div ref="containerMenu" data-lenis-prevent  class="col-span-1 h-fit lg:h-auto lg:col-span-3 px-3 lg:px-6 lg:overflow-y-auto not-scrollbar">
        <template v-for="(item, index) in menu">
            <template v-if="item?.slug == 'only-parent'">
                <div :data-index="index" class="container-item font-book border-b border-[#04040680] py-4 lg:py-3 w-full flex flex-wrap justify-between items-center select-none cursor-pointer" :class="{ 'border-t' : index == 0 }">
                    <h2 @click="openedItem = index" class="grow text-BO2 lg:text-T03 hover:opacity-50 transition-opacity duration-300 ease-in-out" >{{ item?.title }}</h2>
                    <div class="relative w-4 h-4 lg:w-5 lg:h-5" @click="openedItem = index">
                        <span class="w-full h-[1px] bg-black block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        <span class="h-full w-[1px] bg-black block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out" :class="{ 'rotate-90' : openedItem == index }"></span>
                    </div>
                    <div class="w-full grid grid-rows-[0fr] transition-all duration-500 ease-in-out" :class="{ '!grid-rows-[1fr]' : openedItem == index }">
                        <div class="overflow-hidden">
                            <ul class="w-full items text-BO3 lg:text-T04 flex flex-col pt-3 lg:pt-[10px]">
                                <li v-for="children in item?.childrens" class="lg:font-book">
                                    <CommonLink 
                                        :to="children?.slug"
                                        :type="children?.type"
                                        class="block hover:opacity-50 transition-opacity duration-300 ease-in-out"
                                        >
                                        {{ children?.title }}
                                    </CommonLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <li class="text-BO2 lg:text-T03 border-b border-[#04040680] py-3 w-full flex select-none cursor-pointer">
                    <CommonLink 
                        :to="item?.slug"
                        :type="item?.type"
                        class="block w-full font-book hover:opacity-50 transition-opacity duration-300 ease-in-out"
                    >
                        {{ item.title }}
                    </CommonLink>
                </li>
            </template>
        </template>
    </div>
</template>
<script setup>

const { locale } = useI18n()

const siteStore = useSiteStore()
const { data: menuES } = await useFetch(`${siteStore.api}/get-menu?menu=Principal`)
const { data: menuEN } = await useFetch(`${siteStore.api}/get-menu?menu=Principal EN`)

const menu = computed(() => {
    return locale.value == 'es'
    ? menuES?.value?.menu?.items
    : menuEN?.value?.menu?.items
})

const openedItem = ref(0)

onMounted(() => {
    if(window.innerWidth < 1024){
        openedItem.value = -1
    }
})
</script>