<template>
    <div class="mt-6 lg:mt-SP10">
        <h1 class="px-3 pt-6 lg:px-6 lg:py-10 text-TK04 lg:text-DO2 uppercase font-pkiko break-words hyphens-auto">{{ title }}</h1>
        <div class="grid grid-cols-2 lg:grid-cols-6 gap-y-8 lg:gap-y-20 gap-x-3 lg:gap-x-5 px-3 lg:px-6 my-16 lg:my-28">
            <NuxtLink 
                v-for="member in teamData?.team" 
                :to="`${(locale === 'es')?'/equipo/':'/en/team/'}${member?.slug}`"
            >
                <div class="text-BO4 cursor-pointer pointer-events-auto">
                    <template v-if="member?.image">
                        <CommonImage
                            class="w-full aspect-[1/1.26] mb-2 object-cover"
                            width="360"
                            :src="member?.image" 
                            :alt="member?.title"
                        />
                    </template>
                    <template v-else>
                        <div class="w-full aspect-[1/1.26] mb-2 bg-lila py-3 px-2 lg:px-4 flex items-end">
                            <div class="text-T03 xl:text-TK04 font-pkiko">{{ getInitials(member?.title) }}</div>
                        </div>
                    </template>
                    <h2>{{ member?.title }}</h2>
                    <h3 class="text-g4 capitalize">{{ member?.cargo }}</h3>
                </div>
            </NuxtLink>
        </div>
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script setup>
import { useSeoObject } from '../composables/seo';
import { useSiteStore } from '../../stores/site';

const route = useRoute()
const bodyClass = route.name
const siteStore = useSiteStore()

const { locale } = useI18n()
const { data: teamData } = await useFetch(`${siteStore.api}/get-team?lang=${locale.value}`)
const { data: teamPageData} = await useFetch(`${siteStore.api}/get-archive?type=equipo&lang=${locale.value}`)

const title = computed(() => (locale.value === 'es' ? 'Equipo' : 'Team'))
const close = computed(() => (locale.value === 'es' ? 'Cerrar' : 'Close'))

function getInitials(name) {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

useSeoObject(teamPageData?.value?.seo)
</script>
