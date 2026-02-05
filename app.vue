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
import { useMenuStore } from './stores/menu';
import { useSiteStore } from './stores/site';

import { gsap } from 'gsap'

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

provide('siteSettingsDataES', siteSettingsDataES)
provide('siteSettingsDataEN', siteSettingsDataEN)

const { locale } = useI18n()

const favicon = computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.favicon
    : siteSettingsDataEN?.value?.favicon
});

const gtmID = "G-N0Y9LLKK82"

const runtimeConfig = useRuntimeConfig()
const isProduction = runtimeConfig?.public?.appEnv === 'production'
const siteUrlIsValid =
    runtimeConfig?.public?.publicSiteUrl &&
    !runtimeConfig?.public?.publicSiteUrl.includes('netlify.app') &&
    !runtimeConfig?.public?.publicSiteUrl.includes('vercel.app') &&
    !runtimeConfig?.public?.publicSiteUrl.includes('pages.dev')
const shouldIndexFollow = isProduction && siteUrlIsValid

useHead({
    meta: [
        {
            name: 'robots',
            content: shouldIndexFollow ? 'index, follow' : 'noindex, nofollow',
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
    ],
    noscript: gtmID
        ? [
            {
                hid: 'gtm',
                children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0"
        style="display:none;visibility:hidden"></iframe>`,
                'data-analytics-type': 'gtm',
                'data-cookiecategory': 'analytics',
                body: true,
            },
        ]
        : [],
    script: gtmID
        ? [
            {
                src: '/js/analytics.js',
                type: 'text/plain',
                'data-analytics-type': 'gtm',
                'data-category': 'analytics',
                'data-gtmid': gtmID,
                body: false,
            },
        ]
        : [],
})
</script>
