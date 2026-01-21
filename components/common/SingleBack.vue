<template>
    <div class="text-BO3 relative w-full flex justify-end py-3 px-6">
        <NuxtLink :to="routeArchive">
            {{ t("Close") }}
        </NuxtLink>
    </div>
</template>
<script setup>
const props = defineProps({
    type: String
})

const { t } = useI18n()

const routeArchive = computed(() => {
  return t(`routeArchive.${props.type}`)
})
</script>