const isDev = process.env.APP_ENV == 'development'
const isProduction = process.env.APP_ENV == 'production'
const isPreview = process.env.APP_ENV == 'preview'

export default defineNuxtConfig({
    sitemap: {
        exclude: [],
    },
    dev: isDev,
    devtools: { enabled: isDev },
    css: ['@/assets/styles/global.css'],
    /* TODO: Refactor to use the new preview mode for Nuxt 3 to improve consistency (so we can have server rendering for both previews and production) */
    ssr: !isPreview, // Use client rendering for preview mode to avoid caching issues
    // use experimental sharedPrerenderData to improve prerender performance and reduce build time. When using useAsyncData you should use a key that uniquely identifies the data fetched. */
    experimental: {
        sharedPrerenderData: isProduction,
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
        head: {
            htmlAttrs: {
                lang: 'es',
            },
            link: [
                // { rel: "dns-prefetch", href: "//player.vimeo.com" },
                // { rel: "preconnect", href: "//player.vimeo.com" },
            ],
        },
    },
    nitro: {
        prerender: {
            concurrency: 5,
            interval: 500,
        },
        routeRules: {
            // prerender all pages, full static
            '/**/**': { prerender: true },
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            'postcss-viewport-unit-fallback': {},
            'postcss-pxtorem': {
                replace: false,
                propList: [
                    'font',
                    'font-size',
                    'margin',
                    'margin-top',
                    'margin-right',
                    'margin-bottom',
                    'margin-left',
                    'padding',
                    'padding-top',
                    'padding-right',
                    'padding-bottom',
                    'padding-left',
                    'letter-spacing',
                    'width',
                    'height',
                    'max-width',
                    'max-height',
                    'row-gap',
                    'grid-gap',
                    'column-gap',
                    '!border-width',
                    '!border-radius',
                    '!border',
                    '!box-shadow',
                    'right',
                    'left',
                    'top',
                    'bottom',
                ],
            },
        },
    },

    modules: [
        // to allow stores (persistent states) to be used in the app
        '@pinia/nuxt',
        // to create and manage robots.txt file
        '@nuxtjs/robots',
        // to create and manage sitemap.xml file
        '@nuxtjs/sitemap',
        // to query, fetch and display data from Sanity
        // to add custom fonts to the app from Google Fonts
        // you need to npm i @nuxtjs/google-fonts   
        // '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
    ],
    i18n: {
        locales: [
          { code: 'es', language: 'es-ES' },
          { code: 'en', language: 'en-US' }
        ],
        customRoutes: 'config',
        pages: {
            'equipo': { 
                es: '/equipo', 
                en: '/team' 
            },
            'equipo/[id]': { 
                es: '/equipo/[id]', 
                en: '/team/[id]' 
            },
            'noticias': { 
                es: '/noticias', 
                en: '/news' 
            },
            'noticias/[id]': { 
                es: '/noticias/[id]', 
                en: '/news/[id]' 
            },
            'agenda': { 
                es: '/agenda', 
                en: '/calendar' 
            },
            'agenda/[id]': { 
                es: '/agenda/[id]', 
                en: '/calendar/[id]' 
            },
            'poster': { 
                es: '/poster', 
                en: '/poster' 
            },
            'poster/[id]': { 
                es: '/poster/[id]', 
                en: '/poster/[id]' 
            },
            'grados-en-diseno': {
                es: '/grados-en-diseno', 
                en: '/grades-in-design', 
            },
            'grados-en-diseno/[id]': {
                es: '/grados-en-diseno/[id]', 
                en: '/grades-in-design/[id]', 
            },
            'master': {
                es: '/master', 
                en: '/master', 
            },
            'master/[id]': {
                es: '/master/[id]', 
                en: '/master/[id]', 
            },
            'paint': {
                es: '/paint', 
                en: '/paint', 
            },
        },
        defaultLocale: 'es',
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
        
    },
    runtimeConfig: {
        public: {
            appEnv: process.env.APP_ENV,
            api: process.env.API,
            publicSiteUrl: process.env.NUXT_PUBLIC_SITE_URL,
        }
    },
    compatibilityDate: '2024-11-07',
})
