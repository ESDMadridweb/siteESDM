<template>
    <div class="border-b border-g3">
        <div @click="isOpen = !isOpen" class="flex items-center w-full py-3 cursor-pointer relative">
            <div v-if="index && !credits" class="text-LM02 font-mono min-w-[50px] lg:min-w-[100px] lg:pb-3">[ {{ index }} ]</div>
            <div v-if="credits" class="text-LM02 font-mono min-w-[65px] lg:min-w-[100px] lg:pb-3">{{ credits }} ECTS</div>
            <h3 
                class="grow text-BO2 lg:text-T03 font-book"
            >{{ item?.titulo }}</h3>
            <div class="relative w-4 h-4 lg:w-5 lg:h-5">
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-black h-[1px]"></span>
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] bg-black h-full transition-transform duration-300 ease-in-out" :class="{ 'rotate-90' : isOpen }"></span>
            </div>
            <div v-if="item?.tag" class="absolute right-12 top-1/2 -translate-y-1/2 text-L02 px-[6px] w-fit bg-g2 py-1">
                {{ item?.tag }}
            </div>
        </div>
        <div class="transition-all duration-500 ease-in-out grid grid-rows-[0fr]" :class="{ 'grid-rows-[1fr]' : isOpen }">
            <div class="overflow-hidden">
                <template v-if="item?.texto">
                    <CommonTextContent :content="item?.texto" class="text-BO3 lg:text-T06 pl-[50px] lg:pl-[100px] py-5" />
                </template>
                <template v-if="item?.lista">
                    <div v-for="i in item?.lista" class="flex text-BO4 lg:text-BO3 lg:ml-14 lg:pl-16 py-[1px]" :class="{ 'text-g4' : i?.especialidad }">
                        <h4 class="w-full lg:max-w-[590px] grow">{{ i?.texto }}</h4>
                        <span class="min-w-14">{{ i?.creditos }} ects</span>
                    </div>
                    <div class="pt-10 pb-5 uppercase text-LM02 flex gap-2 lg:ml-14 lg:pl-16">
                        <span>{{ item?.formacion_basica }}</span>
                        <span>|</span>
                        <span class="text-g4">{{ item?.obligatorias_especialidad }}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    item: Object,
    index: Number,
    credits: String,
})

const isOpen = ref(false)

</script>
<style scoped>
.content{
    @apply text-BO4 lg:text-BO3
}
.content:deep(h4){
    @apply text-g4
}
.content:deep(h5){
    @apply font-mono uppercase !text-LM02 pt-6
}
.content:deep(a){
    @apply text-green transition-colors duration-500 ease-in-out
}
.content:deep(a:hover){
    @apply text-black
}
.content:deep(ul){
    @apply flex flex-col gap-1
}
.content:deep(li){
    @apply text-BO4 lg:text-BO3 list-inside list-disc
}
</style>