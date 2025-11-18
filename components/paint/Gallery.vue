<template>
    <CommonWrapperScrollHorizontal>
        <template v-for="item in galleryData.dibujos">
            <CommonImage
                :src="item?.image" 
                width="1440" 
                class="object-contain aspect-video w-[800px]"
            />
        </template>
    </CommonWrapperScrollHorizontal>
</template>
<script setup>
import { useSiteStore } from '@/stores/site';
const siteStore = useSiteStore()
const { data: galleryData } = await useFetch(`${siteStore.api}/get-dibujos`)
</script>