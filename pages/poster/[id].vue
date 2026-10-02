<template>
    <CommonWrapperSingle>
        <NuxtLink :to="`${locale == 'es' ? '/poster' : '/en/poster' }`">
            <CommonBackgroundBlur :load="load" />
        </NuxtLink>
        <CommonWrapperModal :load="load">
            <CommonSingleBack type="poster" />
            <ModalsPoster :data="pageData" />
        </CommonWrapperModal>
    </CommonWrapperSingle>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useSiteStore } from '../../stores/site';
import { useSeoObject } from '../composables/seo';
const siteStore = useSiteStore()
const { locale } = useI18n()
const route = useRoute()

const load = ref(false)

const { data: pageData, error: pageError } = await useFetch(`${siteStore.api}/get-poster/${route.params.id}`)

if (pageError.value) {
    const statusCode = pageError.value.statusCode || pageError.value.status || 500
    throw createError({
        statusCode,
        statusMessage: statusCode === 404 ? 'Poster not found' : 'Unable to load poster',
        fatal: true,
    })
}

if (!pageData.value) {
    throw createError({ statusCode: 404, statusMessage: 'Poster not found', fatal: true })
}

const setI18nParams = useSetI18nParams()
const languages = pageData.value.slugs || []
const nuxtI18n = setI18nSlugs(languages)
setI18nParams(nuxtI18n)

onBeforeRouteLeave((to, from, next) => {
    load.value = false;
    setTimeout(() => {
        next()
    }, 500)
})

onBeforeMount(() => { siteStore.overflowHidden = true })
onBeforeUnmount(() => { 
    siteStore.overflowHidden = false
    load.value = false;
})
onMounted(() => { 
    setTimeout(() => {
        load.value = true;
    }, 100); 
})

useSeoObject(pageData?.value?.seo)

</script>
<style scoped>
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
</style>
