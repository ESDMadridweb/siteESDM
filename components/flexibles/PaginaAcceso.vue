<template>
    <div class="flex flex-col gap-14 lg:gap-20">
        <div class="text-BO3 flex flex-nowrap text-nowrap gap-3 px-3 lg:px-6 overflow-x-auto not-scrollbar mt-7">
            <div v-for="(tab, index) in tabs">
                <h3 
                    @click="tabActive = index" 
                    class="cursor-pointer select-none" 
                    :class="{ 'text-g4' : tabActive != index }"
                >
                    {{ tab?.titulo }}
                </h3>
            </div>
        </div>
        <div>
            <template v-for="(tab, index) in tabs">
                <div v-if="index == tabActive">
                    <template v-for="contenido in tab?.contenido">
                        <FlexiblesTextoCentrado v-if="contenido?.acf_fc_layout == 'texto_centrado'" :block="contenido" class="lg:mt-[50px] mb-[72px] lg:mb-[120px]" />
                        <FlexiblesModulo v-if="contenido?.acf_fc_layout == 'modulo'" :block="contenido" />
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    tabs: Array,
})

const tabActive = ref(0)
</script>