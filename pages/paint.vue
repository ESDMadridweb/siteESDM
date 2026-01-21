<template>
    <div>
        <div class="hidden lg:block h-[calc(100vh-63.75px)]">
            <div v-show="painting" class="h-full relative">
                <PaintOptions 
                    v-model:itemSelected="selectedItem" 
                    v-model:colorSelected="selectedColor" 
                    @clear="clear" 
                />
                <PaintCanvas 
                    ref="canvas" 
                    :color="selectedColor" 
                    :canPaint="selectedItem == 'draw'" 
                    :canWrite="selectedItem == 'text'"
                />
                <div class="absolute bottom-6 right-6 flex gap-6">
                    <div class="text-BO4 lg:text-BO3 w-fit z-50 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out" @click="toggleMode()">{{ t("See gallery") }}</div>
                    <div class="text-BO4 lg:text-BO3 w-fit z-50 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out" @click="check()">{{ t("Save") }}</div>
                </div>
                <div class="fixed top-0 left-0 z-[99] w-full h-screen bg-[#04040660] backdrop-blur-sm flex flex-col justify-center items-center gap-10" :class="{'!pointer-events-none !opacity-0' : !wantPublish}">
                    <div v-if="!showSuccessfull" class="font-pkiko text-TK04">{{ t("Want to publish") }}</div>
                    <div v-if="!showSuccessfull" class="flex gap-4">
                        <div class="px-4 py-3 bg-black text-white text-BO4 lg:text-BO3 w-fit cursor-pointer" @click="confirmed()">{{ t("Yes, publish") }}</div>
                        <div class="px-4 py-3 bg-black text-white text-BO4 lg:text-BO3 w-fit cursor-pointer" @click="canceled()">{{ t("No, not yet") }}</div>
                    </div>
                    <div v-if="showSuccessfull" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-BO2 whitespace-pre-line text-center">
                        {{ messageSuccessfull }}
                    </div>
                </div>
            </div>
            <div v-show="!painting" class="h-full relative">
                <PaintGallery />
                <div class="absolute bottom-6 left-6 flex gap-6 z-50">
                    <div class="text-BO4 lg:text-BO3 w-fit z-50 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out" @click="toggleMode()">{{ t("Return to create") }}</div>
                </div>
            </div>
        </div>
        <div class="lg:hidden font-pkiko text-T03 px-3 text-center py-40">
            {{ messageMobile }}
        </div>
    </div>

</template>
<script setup>
import { buildBodyClass } from '@/utils'
import { useSeoObject } from '@/composables/seo';
import { useSiteStore } from '@/stores/site';

const siteStore = useSiteStore()

const selectedColor = ref('#000000')
const selectedItem = ref('select')

const route = useRoute()
const path = route.path
const bodyClass = buildBodyClass(path)

const canvas = ref(null)

const { locale, t } = useI18n()

const { data: siteSettingsDataES } = await useFetch(`${siteStore.api}/get-site-settings?lang=es`)
const { data: siteSettingsDataEN } = await useFetch(`${siteStore.api}/get-site-settings?lang=en`)
const { data: paintPageData } = await useFetch(`${siteStore.api}/get-archive?type=paint&lang=${locale.value}`)

const showSuccessfull = ref(false)
const messageSuccessfull = computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.dibujos_message
    : siteSettingsDataEN?.value?.dibujos_message
});

const messageMobile= computed(() => {
    return locale.value == 'es' 
    ? siteSettingsDataES?.value?.dibujos_message_mobile
    : siteSettingsDataEN?.value?.dibujos_message_mobile
});

const wantPublish = ref(false)
const painting = ref(true)

const check = () => {
    wantPublish.value = true
}
const confirmed = () => {
    canvas.value.uploadCanvasToPNG()
    showSuccessfull.value = true
    canvas.value.clearCanvas()
    setTimeout(() => {
        wantPublish.value = false
        painting.value = false
        showSuccessfull.value = false
    }, 2000);
}
const canceled = () => {
    wantPublish.value = false
}

const clear = () => {
    canvas.value.clearCanvas()
}

const toggleMode = () => {
    painting.value = !painting.value
}

useHead({
    bodyAttrs: {
        class: bodyClass,
    },
})

useSeoObject(paintPageData?.value?.seo)
</script>

