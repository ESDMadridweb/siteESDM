<template>
    <div class="text-BO3 relative w-full flex justify-end py-3 px-6">
        <NuxtLink :to="routeArchive">
            {{ Cerrar }}
        </NuxtLink>
    </div>
</template>
<script setup>
const props = defineProps({
    type: String
})

const { locale } = useI18n()
const Cerrar = computed(() => (locale.value === 'es' ? 'Cerrar' : 'Close'))

const routeArchive = computed(() => {
  switch (props.type) {
    case 'poster':
      return (locale.value == 'es') ? '/poster' : '/en/poster'
    case 'equipo':
      return (locale.value == 'es') ? '/equipo' : '/en/team'
    case 'noticias':
      return (locale.value == 'es') ? '/noticias' : '/en/news'
    case 'agenda':
      return (locale.value == 'es') ? '/agenda' : '/en/calendar'
    default:
      return '/'
  }
})
</script>