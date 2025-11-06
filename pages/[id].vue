<template>
    <div class="mt-6 lg:mt-SP10">
        <h1 class="px-3 pt-6 lg:px-6 text-TK04 lg:text-DO2 uppercase font-pkiko break-words hyphens-auto">{{ pageData?.title }}</h1>
        <template v-if="pageData?.template == 'Página de texto'">
            <FlexiblesPaginaTexto :blocks="pageData?.content" />
        </template>
        <template v-if="pageData?.template == 'Página de instalaciones'">
            <CommonStickyNav :sections="sections" />
            <CommonInitImagesScroll v-if="pageData?.imagenes" :images="pageData?.imagenes" id="intro" />
            <FlexiblesPaginaInstalaciones :blocks="pageData?.content" />
        </template>
        <template v-if="pageData?.template == 'Página de acceso'">
            <FlexiblesPaginaAcceso :tabs="pageData?.pestanas" />
        </template>
    </div>
</template>

<script setup>
import { buildBodyClass, setI18nSlugs } from '@/utils'
import { useSiteStore } from '../../stores/site';
import { useSeoObject } from '../composables/seo';
const siteStore = useSiteStore()

const sections = [
  { id: 'intro', title: { es: 'Intro', en: 'Intro' } },
  { id: 'jardin', title: { es: 'Jardín', en: 'Garden' } },
  { id: 'talleres', title: { es: 'Talleres', en: 'Workshops' } },
  { id: 'anexo', title: { es: 'Anexo', en: 'Anexo' } },
  { id: 'biblioteca', title: { es: 'Biblioteca', en: 'Library' } },
];

const route = useRoute()
const bodyClass = route.params.id

const { data: pageData } = await useFetch(`${siteStore.api}/get-page/${route.params.id}`)

const setI18nParams = useSetI18nParams()
const languages = pageData?.value?.slugs
const nuxtI18n = setI18nSlugs(languages)
setI18nParams(nuxtI18n)

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