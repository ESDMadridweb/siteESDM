<template>
    <div class="mt-6 lg:mt-SP10">
        <h1 class="px-3 lg:px-6 text-TK04 lg:text-DO2 uppercase font-pkiko break-words hyphens-auto">{{ pageData?.title }}</h1>
        <CommonStickyNav :sections="sections" />
        <CommonInitImagesScroll v-if="pageData?.imagenes" :images="pageData?.imagenes" />
        <FlexiblesPaginaEstudios :blocks="pageData?.content" />
    </div>
</template>

<script setup>

const sections = [
  { id: 'info-general', title: { es: 'Sobre el grado', en: 'About the degree' } },
  { id: 'proyectos', title: { es: 'Proyectos', en: 'Projects' } },
  { id: 'profesorado', title: { es: 'Profesorado', en: 'Faculty' } },
  { id: 'acceso-precios', title: { es: 'Acceso y precios', en: 'Admission and fees' } },
  { id: 'practicas-empresas', title: { es: 'Prácticas en empresas', en: 'Internships' } },
  { id: 'alumni', title: { es: 'Alumni', en: 'Alumni' } }
];

import { useSeoObject } from '../composables/seo';
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore()

const route = useRoute()
const bodyClass = route.name

const { data: pageData } = await useFetch(`${siteStore.api}/get-estudio/${route.params.id}`)

const setI18nParams = useSetI18nParams()
const languages = pageData?.value?.slugs
const nuxtI18n = setI18nSlugs(languages)
setI18nParams(nuxtI18n)

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

useSeoObject(pageData?.value?.seo)

</script>