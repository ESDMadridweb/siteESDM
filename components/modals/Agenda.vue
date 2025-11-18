<template>
    <h1 class="px-3 lg:px-6 pb-16 lg:pb-32 text-T03 lg:text-TK04 font-pkiko lg:max-w-[70%]">{{ data?.title }}</h1>
    <CommonImage
        width="1920"
        class="w-full h-auto px-3 lg:px-6"
        :src="data?.image" 
        :alt="data?.title"
    />
    <div class="border-b border-g3 grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-12 pt-10 pb-16 px-3 lg:px-6">
        <div class="lg:col-span-5 text-BO4 lg:text-BO3">
            <div v-html="data?.info" />
        </div>
        <div class="lg:col-span-7 flex flex-col gap-8">
            <div v-html="data?.content" class="text-BO3 lg:text-T06" />
            <CommonLink v-if="data?.button" :to="data?.button?.url" class="text-BO3 bg-black text-white py-2 px-3 w-fit">
                {{ data?.button?.title }}
            </CommonLink>
        </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 pt-10 pb-16 px-3 lg:px-6">
        <div class="lg:col-span-5 text-BO4 lg:text-BO3">
            {{ data?.subtitle }}
        </div>
        <div class="lg:col-span-7 flex flex-col gap-8">
            <div v-html="data?.text" class="text-BO3 lg:text-T06 flex flex-col gap-8" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object
})
</script>