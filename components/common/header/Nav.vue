<template>
    <nav class="uppercase flex flex-col lg:flex-row gap-[50px] lg:gap-5 text-center lg:text-start select-none">
        <NuxtLink v-for="item in items" :to="item?.url">
            {{ item?.title }}
        </NuxtLink>
    </nav>
</template>
<script setup>
const props = defineProps({
    items: Array,
})
</script>