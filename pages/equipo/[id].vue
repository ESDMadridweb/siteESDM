<template>
    <CommonWrapperSingle>
        <NuxtLink :to="`${locale == 'es' ? '/equipo' : '/en/team' }`">
            <CommonBackgroundBlur :load="load" />
        </NuxtLink>
        <CommonWrapperModal :load="load">
            <CommonSingleBack type="equipo" />
            <ModalsTeam :data="pageData" /> 
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

const { data: pageData } = await useFetch(`${siteStore.api}/get-member/${route.params.id}?lang=${locale.value}`)

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