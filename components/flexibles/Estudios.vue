<template>
    <div class="flex flex-col gap-28 lg:pt-40">
        <h2 class="hidden lg:block px-3 lg:px-6 text-center text-TK02 font-pkiko uppercase max-w-[1100px] mx-auto">{{ block?.titulo }}</h2>
        <div class="flex flex-col gap-16 lg:gap-32">
            <div v-for="grupo in block?.grupos" class="flex flex-col gap-8">
                <h3 class="px-3 lg:px-6 text-T03 uppercase lg:normal-case lg:text-TK04 font-pkiko">{{ grupo?.titulo }}</h3>
                <div class="border-t border-g3 last:border-b lg:last:border-b-0">
                    <CommonLink v-for="(estudio, index) in grupo?.estudios" :to="estudio?.slug" :type="estudio?.type">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 px-3 lg:px-6 py-6 lg:py-4 group hover:bg-blue transition-colors duration-500 ease-in-out" :class="{ 'border-t border-g3' : index != 0 }">
                            <div class="hidden lg:block col-span-1">
                                <CommonImage 
                                    class="w-full aspect-[1/1.17] object-cover object-center"
                                    width="360"
                                    :src="estudio?.image" 
                                    :alt="estudio?.titulo"
                                />
                            </div>
                            <h3 class="lg:col-span-5 text-T04 lg:text-T03 w-3/4 lg:w-full font-book">{{ estudio?.titulo }}</h3>
                            <div class="lg:col-span-5 text-BO3 lg:text-T06 max-w-[610px]" v-html="estudio?.description" />
                            <div class="col-span-1 w-full hidden lg:flex justify-end">
                                <svg class="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0347 7.74074L25.4125 15.1096H3.55469V16.8874H25.4125L18.0347 24.2563L19.2969 25.5185L28.808 15.9985L19.2969 6.47852L18.0347 7.74074Z" fill="#040406"/>
                                </svg>
                            </div>
                            <div class="lg:hidden mt-14 text-BO3">{{ SeeMore }}</div>
                        </div>
                    </CommonLink>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    block: Object,
})

const { locale } = useI18n()
const SeeMore = computed(() => {
    return locale.value == 'es'
    ? 'Ver más'
    : 'See more'
})
</script>