<template>
    <div class="pb-16 lg:pb-32">
        <FlexiblesContent
            v-if="pageData?.content"
            :blocks="pageData?.content" 
            class="flex flex-col gap-10 lg:gap-16 my-10 lg:my-16" 
        />
    </div>
</template>

<script setup>
import { buildBodyClass } from '@/utils'
import { useSeoObject } from '@/composables/seo'
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore()

const route = useRoute()
const path = route.path
const bodyClass = buildBodyClass(path)

definePageMeta({
    layout: 'default',
    scrollToTop: true
})

const { locale } = useI18n()

const nameHome = computed(() => {
    return locale.value == 'es'
    ? 'inicio'
    : 'home'
})

const { data: pageData } = await useFetch(`${siteStore.api}/get-page/${nameHome.value}`)

// add body class with usehead
useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

useSeoObject(
    pageData?.value?.title,
    'Escuela Superior de Diseño Madrid',
)
</script>
