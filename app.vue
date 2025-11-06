<template>
    <Html>
        <Body class="antialiased font-default text-black" :class="{ 'overflow-hidden' : menuStore.isOpened || siteStore.overflowHidden }">
            <div id="__layout">
                <NuxtLayout>
                    <NuxtPage />
                </NuxtLayout>
            </div>
            <CommonAnimations />
        </Body>
    </Html>
</template>

<script setup>
import { useMenuStore } from '../../stores/menu';
import { useSiteStore } from './stores/site';

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Lenis from 'lenis'
let lenis = null

const initSmoothScroll = () => {
    if (window.matchMedia('(min-width: 1024px)').matches) {
        lenis = new Lenis({
            duration: 1,
        })
        gsap.ticker.add(time => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
    }
}

const siteStore = useSiteStore()
const menuStore = useMenuStore()

const nuxtApp = useNuxtApp()
const route = useRoute()
const previousRouteStore = usePreviousRouteStore()

onMounted(() => {
    initSmoothScroll()
    gsap.registerPlugin(ScrollTrigger)
})

const cursorStore = useCursorStore()

nuxtApp.hook('page:start', () => {
    previousRouteStore.name = route?.name
    resetCursor()
})
nuxtApp.hook('page:finish', () => {
    resetCursor()
    setTimeout(() => {
        resetCursor()
    }, 500);
})

const resetCursor = () => {
    cursorStore.active = false;
    cursorStore.title = '';
    cursorStore.subtitle = '';
    cursorStore.text = '';
}

const { data: siteSettingsDataES } = await useFetch(`${siteStore.api}/get-site-settings?lang=es`)
const { data: siteSettingsDataEN } = await useFetch(`${siteStore.api}/get-site-settings?lang=en`)

const { locale } = useI18n()

const favicon = computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.favicon
    : siteSettingsDataEN?.value?.favicon
});

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, nofollow',
        },
    ],
    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: siteSettingsDataES?.value?.favicon?.url,
        },
        {
            rel: 'preload',
            href: '/fonts/PKiko-Regular.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },
        {
            rel: 'preload',
            href: '/fonts/PKiko-RegularItalic.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },
        {
            rel: 'preload',
            href: '/fonts/PPNeueMontreal-Book.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },
        {
            rel: 'preload',
            href: '/fonts/PPNeueMontreal-BookItalic.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },
        {
            rel: 'preload',
            href: '/fonts/PPNeueMontreal-Regular.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },
        {
            rel: 'preload',
            href: '/fonts/PPNeueMontreal-Italic.woff2',
            crossorigin: '',
            as: 'font',
            type: 'font/woff2',
        },

    ]
})
</script>
