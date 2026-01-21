<template>
    <div class="mt-6 lg:mt-SP10">
        <h1 class="px-3 pt-6 lg:px-6 lg:py-10 text-TK04 lg:text-DO2 uppercase font-pkiko break-words hyphens-auto">{{ t("News") }}</h1>
        <div class="px-3 lg:px-6 flex gap-3 items-center pb-6 mt-14 lg:mt-28">
            <span class="uppercase text-LM02 pt-1 lg:pt-0">{{ t("See") }}:</span>
            <div v-for="category in newsData?.categories" class="flex items-center text-BO4 lg:text-BO3 cursor-pointer gap-[6px] select-none" @click="(categorySelected == category?.slug) ? categorySelected = '' : categorySelected = category?.slug">
                <span class="w-4 h-4 border border-g3 rounded-full" :class="{ 'bg-black' : categorySelected == category?.slug}"></span>
                <span class="pt-1 lg:pt-0">{{ category?.name }}</span>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 mb-14 lg:mb-28">
            <template v-for="item in newsData?.news" >
                <NuxtLink 
                    v-if="item?.category?.slug == categorySelected || categorySelected == ''"
                    :to="`${(locale === 'es')?'/noticias/':'/en/news/'}${item?.slug}`" 
                    class="flex flex-col gap-5 border-t border-g3 px-3 py-4 lg:p-6 hover:bg-blue transition-colors duration-300 ease-in-out"
                    @mouseenter="
                        cursorStore.active = true;
                        cursorStore.text = t('Read');
                    " 
                    @mouseleave="
                        cursorStore.active = false;
                        cursorStore.text = '';
                    "
                >
                    <div class="text-LM02 flex gap-3 items-center">
                        <div>{{ item?.date }}</div>
                        <div class="border rounded-full px-[6px] uppercase">{{ item?.category?.name }}</div>
                    </div>
                    <div class="lg:aspect-[2/1] text-BO3 lg:text-BO2 lg:font-book">{{ item?.preview }}</div>
                </NuxtLink>
            </template>
        </div>
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script setup>
import { useSeoObject } from '../composables/seo';
import { useSiteStore } from '../../stores/site';

const route = useRoute()
const bodyClass = route.name
const siteStore = useSiteStore()

const { locale, t } = useI18n()
const { data: newsData } = await useFetch(`${siteStore.api}/get-news?lang=${locale.value}`)
const { data: newsPageData} = await useFetch(`${siteStore.api}/get-archive?type=noticias&lang=${locale.value}`)

const categorySelected = ref('')
const cursorStore = useCursorStore()

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

onUnmounted(() => {
    cursorStore.active = false;
    cursorStore.text = '';
})

useSeoObject(newsPageData?.value?.seo)
</script>
