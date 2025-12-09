<template>
    <div>
        <h1 class="px-3 lg:px-6 pb-16 lg:pb-32 text-T03 lg:text-TK04 font-pkiko break-words hyphens-auto capitalize">{{ data?.title }}</h1>
        <div class="lg:border-t border-g3 grid grid-cols-1 lg:grid-cols-12 px-0 lg:px-6 lg:pt-6 pb-8 lg:pb-14">
            <div class="lg:col-span-3">
                <template v-if="data?.image">
                    <CommonImage
                        class="w-full aspect-[1/1.26] mb-8 lg:mb-2 object-cover"
                        width="360"
                        :src="data?.image" 
                        :alt="data?.title"
                    />
                </template>
                <template v-else>
                    <div class="w-full aspect-[1/1.26] mb-8 lg:mb-2 bg-lila py-3 px-4 flex items-end">
                        <div class="text-TK04 lg:text-TK02 font-pkiko">{{ getInitials(data?.title) }}</div>
                    </div>
                </template>
            </div>
            <div class="lg:col-start-5 lg:col-span-8 px-3 lg:px-0">
                <div v-html="data?.content" class="text-BO3 lg:text-T06 whitespace-pre-line" />
            </div>
        </div>
        <div class="border-t border-g3 grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 pt-4 lg:pt-6 pb-14 gap-6 lg:gap-0">
            <h2 class="lg:col-span-3 text-BO4 lg:text-BO3">{{ Asignaturas }}</h2>
            <div class="lg:col-start-5 lg:col-span-8">
                <div v-for="(asignatura, index) in data?.asignaturas" class="flex items-center py-2 lg:py-4 border-b border-g3" :class="{ '!border-b-0' : index == data?.asignaturas.length - 1 }">
                    <h3 class="w-2/5 lg:w-[203px] text-LM02">{{ asignatura?.curso }}</h3>
                    <h3 class="text-BO3 lg:text-T06">{{ asignatura?.asignatura }}</h3>
                </div>
            </div>
        </div>
        <div class="border-t border-g3 grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 pt-4 lg:pt-6 pb-14 gap-6 lg:gap-0">
            <h2 class="lg:col-span-3 text-BO3">{{ LoQueLeMueve }}</h2>
            <div v-html="data?.lo_que_le_mueve" class="lg:col-start-5 lg:col-span-8 text-BO3 lg:text-T06" />
        </div>
        <div class="border-t border-g3 grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 pt-4 lg:pt-6 pb-14 gap-6 lg:gap-0">
            <h2 class="lg:col-span-3 text-BO3">{{ Contacto }}</h2>
            <div v-html="data?.contacto" class="lg:col-start-5 lg:col-span-8 text-BO3 lg:text-T06 text-green" />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    data: Object,
})

const { locale } = useI18n()

const Asignaturas = computed(() => (locale.value === 'es' ? 'Asignaturas que imparte' : 'Subjects taught'))
const LoQueLeMueve = computed(() => (locale.value === 'es' ? 'Lo que le mueve' : 'What moves you'))
const Contacto = computed(() => (locale.value === 'es' ? 'Contacto' : 'Contact'))

function getInitials(name) {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}

</script>