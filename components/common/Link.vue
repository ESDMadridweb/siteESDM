<template>
    <NuxtLink :to="getLinkUrl" :aria-label="linkAriaLabel" :target="target">
        <slot />
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
    to: String,
    target: String,
    type: String,
    ariaLabel: String,
})

const { locale } = useI18n()

const language = computed(() => {
    return locale.value == 'es'
    ? '/'
    : '/en/'
})

const agenda = computed(() => {
    return locale.value == 'es'
    ? 'agenda'
    : 'calendar'
})

const grado = computed(() => {
    return locale.value == 'es'
    ? 'grados-en-diseno'
    : 'grades-in-design'
})

const getLinkUrl = computed(() => {

    if (props.to && (props.to.startsWith('http://') || props.to.startsWith('https://'))) {
        return props.to
    }

    switch(props.type){
        case 'home':
            return `${language.value}`
        case 'page':
            return `${language.value}${props.to}`
        case 'grado':
            return `${language.value}${grado.value}/${props.to}`
        case 'master':
            return `${language.value}master/${props.to}`
        case 'agenda':
            return `${language.value}${agenda.value}/${props.to}`
        default:
            return `${language.value}${props.to}`
    }
})

const linkAriaLabel = computed(() => {
    // Si se pasa ariaLabel explícitamente, lo usamos
    if (props.ariaLabel) return props.ariaLabel

    // Si no, generamos uno basado en type y to
    switch(props.type){
        case 'page':
            return `Ir a la página ${props.to}`
        case 'grado':
            return `Ir al grado ${props.to}`
        case 'master':
            return `Ir al máster ${props.to}`
        case 'agenda':
            return `Ir a la agenda ${props.to}`
        default:
            return `Ir a ${props.to}`
    }
})


</script>