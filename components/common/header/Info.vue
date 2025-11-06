<template>
    <div class="col-span-1 order-2 lg:order-[unset] w-full flex flex-col gap-10 lg:gap-0 justify-between px-3 lg:px-6 pb-4 -mt-2">
        <div class="flex flex-col gap-3 lg:max-w-[270px]">
            <h3 class="text-L02 uppercase">{{ ahoraMismoTitle }}</h3>
            <div class="flex flex-col gap-2">
                <NuxtLink v-for="(link, index) in ahoraMismoLinks" :to="link?.link?.url" :target="link?.link?.target" class="flex items-start gap-3">
                    <span class="text-L02 min-w-max">[ {{ index + 1 }} ]</span>
                    <span class="text-BO4">{{ link?.link?.title }}</span>
                </NuxtLink>
            </div>
        </div>
        <div>
            <div class="lg:hidden cursor-pointer">
                <div v-if="locale == 'es'" @click="setLocale('en')">EN</div>
                <div v-if="locale == 'en'" @click="setLocale('es')">ES</div>
            </div>
            <div class="flex flex-col">
                <NuxtLink :to="(locale == 'es') ? '/paint' : '/paint' ">
                    {{ (locale == 'es') ? 'De otra forma' : 'Otherwise' }}
                </NuxtLink>
                <NuxtLink :to="(locale == 'es') ? '/contacto' : '/contacto' ">
                    {{ (locale == 'es') ? 'Contacto' : 'Contact' }}
                </NuxtLink>
            </div>
            <NuxtLink 
                class="lg:hidden flex items-center gap-1" 
                to="https://aulavirtual38.educa.madrid.org/esd.madrid/" 
                target="_blank"
            >
                <span>{{ aulaVirtual }}</span>
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4837 10.9312L12.3762 10.9312L12.3731 3.53604L4.97792 3.5329L4.97792 4.42542L10.8583 4.42228L3.13043 12.1502L3.75897 12.7787L11.4869 5.05082L11.4837 10.9312Z" fill="#040406"/>
                    </svg>
                </span>
            </NuxtLink>
        </div>
    </div>
</template>
<script setup>
const { locale, setLocale } = useI18n()
const siteStore = useSiteStore()
const { data: ahoraMismoES } = await useFetch(`${siteStore.api}/get-nowinfo?lang=es`)
const { data: ahoraMismoEN } = await useFetch(`${siteStore.api}/get-nowinfo?lang=en`)

const aulaVirtual = computed(() => {
    return locale.value == 'es'
    ? 'Aula Virtual'
    : 'Virtual Classroom'
})

const ahoraMismoTitle = computed(() => {
    return locale.value == 'es'
    ? ahoraMismoES?.value?.title
    : ahoraMismoEN?.value?.title
})

const ahoraMismoLinks = computed(() => {
    return locale.value == 'es'
    ? ahoraMismoES?.value?.links
    : ahoraMismoEN?.value?.links
})
</script>