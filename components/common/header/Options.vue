<template>
    <div class="cursor-pointer select-none flex gap-60 text-BO3">
        <div class="hidden lg:flex gap-10">
            <NuxtLink to="https://aulavirtual38.educa.madrid.org/esd.madrid/" target="_blank" class="flex items-center gap-1">
                <span>{{ aulaVirtual }}</span>
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.4837 10.9312L12.3762 10.9312L12.3731 3.53604L4.97792 3.5329L4.97792 4.42542L10.8583 4.42228L3.13043 12.1502L3.75897 12.7787L11.4869 5.05082L11.4837 10.9312Z" fill="#040406"/>
                    </svg>
                </span>
            </NuxtLink>
            <div>
                <div v-if="locale == 'es'" @click="setLocale('en')">EN</div>
                <div v-if="locale == 'en'" @click="setLocale('es')">ES</div>
            </div>
        </div>
        <div 
            class="flex items-center gap-2 lg:gap-5 relative z-50"
            @click="handleMenu()"
        >
            <span v-if="!menuStore.isOpened" class="w-11 text-end">{{ menuString }}</span>
            <span v-if="menuStore.isOpened" class="lg:w-11">{{ closeString }}</span>
            <span class="bg-green w-5 h-5 rounded-full transition-colors duration-300 ease-in-out" :class="{ '!bg-black' : menuStore.isOpened }"></span>
        </div>
    </div>
</template>
<script setup>

function handleMenu(){
    menuStore.isOpened = !menuStore.isOpened;
}

const menuStore = useMenuStore()

const { locale, setLocale } = useI18n()

const aulaVirtual = computed(() => {
    return locale.value == 'es'
    ? 'Aula Virtual'
    : 'Virtual Classroom'
})

const menuString = computed(() => {
    return locale.value == 'es'
    ? 'Menú'
    : 'Menu'
})

const closeString = computed(() => {
    return locale.value == 'es'
    ? 'Cerrar'
    : 'Close'
})

</script>