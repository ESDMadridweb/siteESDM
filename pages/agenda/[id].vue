<template>
    <CommonWrapperSingle>
        <NuxtLink :to="`${locale == 'es' ? '/agenda' : '/en/calendar' }`">
            <CommonBackgroundBlur :load="load" />
        </NuxtLink>
        <CommonWrapperModal :load="load">
            <CommonSingleBack type="agenda" />
            <ModalsAgenda :data="pageData" />
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

const { data: pageData } = await useFetch(`${siteStore.api}/get-agenda/${route.params.id}?lang=${locale.value}`)

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