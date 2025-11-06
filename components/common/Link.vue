<template>
    <NuxtLink :to="getLinkUrl">
        <slot />
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
    to: String,
    target: String,
    type: String,
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

</script>