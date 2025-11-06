<template>
    <div class="cursor-pointer select-none flex gap-60 text-BO3">
        <div class="hidden lg:flex gap-10">
            <NuxtLink to="https://aulavirtual38.educa.madrid.org/esd.madrid/" target="_blank">{{ aulaVirtual }}</NuxtLink>
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