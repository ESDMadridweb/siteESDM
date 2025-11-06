<template>
    <footer class="bg-green min-h-screen px-3 lg:px-6 pt-6 pb-8 flex flex-col gap-8 justify-between relative z-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0">
            <div class="lg:col-span-7 text-T06 lg:text-T04 max-w-[450px]">{{ footerTitle }}</div>
            <div class="lg:col-span-3 flex flex-col gap-8 text-BO3">
                <div class="flex flex-col gap-1">
                    <CommonLink v-for="item in legalMenu" :to="item?.slug">
                        {{ item?.title }}
                    </CommonLink>
                </div>
                <div class="hidden lg:flex flex-col" v-html="siteSettingsDataES?.address" />
            </div>
            <div class="lg:col-span-2 flex flex-col gap-1 text-BO3">
                <NuxtLink v-for="item in siteSettingsDataES?.socials" :to="item?.social?.url" :target="item?.social?.target">
                    {{ item?.social?.title }}
                </NuxtLink>
            </div>
            <div class="flex lg:hidden flex-col" v-html="siteSettingsDataES?.address" />
        </div>
        <div class="w-full flex flex-col-reverse lg:flex-row lg:justify-between items-end gap-11 lg:gap-20">
            <svg class="w-full lg:w-auto h-auto" width="1110" height="343" viewBox="0 0 1110 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M403.045 342.278C364.464 342.278 333.844 334.011 311.185 317.476C288.526 300.941 272.91 276.598 264.336 244.447L310.726 234.343C316.237 256.695 326.648 273.23 341.958 283.947C357.574 294.664 377.937 300.023 403.045 300.023C428.154 300.023 447.597 295.277 461.376 285.784C475.462 275.986 482.504 262.972 482.504 246.744C482.504 231.74 477.605 219.798 467.806 210.918C458.314 202.039 445.148 196.68 428.307 194.843L364.923 187.494C334.303 183.82 311.032 173.868 295.109 157.639C279.493 141.411 271.685 120.436 271.685 94.7153C271.685 76.037 276.584 59.6553 286.383 45.5701C296.181 31.1787 309.96 20.1554 327.72 12.5004C345.786 4.53921 366.607 0.558594 390.185 0.558594C423.561 0.558594 451.578 8.36671 474.237 23.9829C496.896 39.293 511.899 61.3394 519.248 90.1223L473.318 101.145C467.5 82.161 457.549 67.7696 443.464 57.9712C429.378 47.8666 411.619 42.8143 390.185 42.8143C367.526 42.8143 349.766 47.4073 336.906 56.5933C324.352 65.7793 318.074 78.1804 318.074 93.7967C318.074 107.882 322.514 118.905 331.394 126.866C340.58 134.828 354.206 139.88 372.272 142.023L433.818 149.372C464.132 153.046 487.556 163.457 504.091 180.605C520.626 197.446 528.893 219.492 528.893 246.744C528.893 266.034 523.841 282.876 513.737 297.267C503.938 311.658 489.547 322.835 470.562 330.796C451.578 338.451 429.072 342.278 403.045 342.278Z" fill="#040406"/>
                <path d="M0.133789 6.07017H224.273V48.3258H45.1453V147.535H212.79V189.79H45.1453V294.511H229.784V336.767H0.133789V6.07017Z" fill="#040406"/>
                <path d="M927.574 335.75L1109.99 335.75V297.932L927.574 297.932V335.75Z" fill="#040406"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M759.461 9.74529H566.435V54.3403H608.964V290.788H566.435V335.383H759.461L852.219 239.809V105.32L759.461 9.74529ZM807.624 221.713L740.59 290.765H653.536V54.3403H740.59L807.624 123.392V221.713Z" fill="#040406"/>
                <path d="M927.832 4.00719H979.259L1018.35 136.473H1019.42L1058.28 4.00719H1109.94V171.858H1078.69V38.9326H1077.46L1038.83 171.858H997.797L959.161 38.9326H957.698V171.858H927.832V4.00719Z" fill="#040406"/>
            </svg>
            <img :src="siteSettingsDataES?.footer?.logo?.url" :alt="siteSettingsDataES?.footer?.logo?.alt">
        </div>
    </footer>
</template>

<script setup>

import { useSiteStore } from '../../stores/site';
const siteStore = useSiteStore()
const { locale } = useI18n()

const { data: siteSettingsDataES } = await useFetch(`${siteStore.api}/get-site-settings?lang=es`)
const { data: siteSettingsDataEN } = await useFetch(`${siteStore.api}/get-site-settings?lang=en`)

const { data: legalMenuES } = await useFetch(`${siteStore.api}/get-menu?menu=Legal`)
const { data: legalMenuEN } = await useFetch(`${siteStore.api}/get-menu?menu=Legal EN`)

const footerTitle = computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.footer?.title 
    : siteSettingsDataEN?.value?.footer?.title
});

const footerLogo = computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.footer?.logo 
    : siteSettingsDataEN?.value?.footer?.logo
});

const legalMenu = computed(() => {
    return locale.value == 'es'
    ? legalMenuES?.value?.menu?.items
    : legalMenuEN?.value?.menu?.items
})


</script>
