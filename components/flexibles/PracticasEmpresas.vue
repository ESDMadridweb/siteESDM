<template>
    <div id="practicas-empresas" class="flex flex-col gap-5 lg:gap-10">
        <h2 class="text-T03 lg:text-TK04 font-pkiko px-3 lg:px-6">{{ block?.titulo }}</h2>
        <div class="grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-12 px-3 lg:px-6 border-t border-g3 pt-4 lg:pt-6">
            <div class="hidden lg:block lg:col-span-5">
                <CommonLink :to="block?.link?.url" :target="block?.link?.target" class="text-g4 hover:text-green flex items-center gap-1 group transition-colors duration-300 ease-in-out">
                    <span class="text-BO4">{{ block?.link?.title }} </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill-g4 group-hover:fill-green transition-colors duration-300 ease-in-out"  fill-rule="evenodd" clip-rule="evenodd" d="M14.6196 7.99855L9.65202 3.02637L8.80866 3.86972L12.3473 7.4041H1.63086V8.59299H12.3473L8.80866 12.1274L9.65202 12.9707L14.6196 7.99855Z" fill="#1CCD38"/>
                    </svg>
                </CommonLink>
            </div>
            <div class="lg:col-start-6 lg:col-span-7">
                <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 text-BO3">
                    <div v-html="block?.columna_izquierda" />
                    <div v-html="block?.columna_derecha" />
                </div>
            </div>
            <CommonLink :to="block?.link?.url" :target="block?.link?.target" class="lg:hidden text-g4 hover:text-green flex items-center gap-1 group transition-colors duration-300 ease-in-out">
                <span class="text-BO4">{{ block?.link?.title }} </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-g4 group-hover:fill-green transition-colors duration-300 ease-in-out" fill-rule="evenodd" clip-rule="evenodd" d="M14.6196 7.99855L9.65202 3.02637L8.80866 3.86972L12.3473 7.4041H1.63086V8.59299H12.3473L8.80866 12.1274L9.65202 12.9707L14.6196 7.99855Z"/>
                </svg>
            </CommonLink>
        </div>
        <div class="w-full overflow-hidden lg:mt-16">
            <CommonMarquee>
                <div v-for="logo in block?.logos" class="w-[100px] h-[140px]">
                    <CommonImage
                        class="w-full h-full object-contain object-center"
                        width="240"
                        :src="logo?.sizes?.large" 
                        :alt="logo?.alt"
                    />
                </div>
            </CommonMarquee>
        </div>
    </div>
    
</template>
<script setup>
const props = defineProps({
    block: Object,
})
</script>