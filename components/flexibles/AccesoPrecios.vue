<template>
    <div id="acceso-precios" class="flex flex-col gap-5 lg:gap-10">
        <h2 class="text-T03 lg:text-TK04 font-pkiko px-3 lg:px-6">{{ block?.titulo }}</h2>
        <div class="flex flex-col gap-14 lg:gap-28">
            <template v-for="(grupo, index) in block?.grupo">
                <template v-if="index != block?.grupo.length - 1">
                    <div class="grid grid-cols-1 lg:grid-cols-12 px-3 lg:px-6 pt-6 border-t border-g3">
                        <div class="lg:col-span-5">
                            <h3 class="text-BO4 lg:text-BO3 max-w-[271px] pb-5 lg:pb-0">{{ grupo?.titulo }}</h3>
                        </div>
                        <div class="lg:col-start-6 lg:col-span-7 border-t lg:border-t-0 border-g3">
                            <CommonAccordeon :block="grupo?.fila" />
                        </div>
                    </div>
                </template>
                <template v-else>

                    <div v-if="$route.path.includes('grados-en-diseno')" class="px-3 lg:px-6 flex justify-center">
                        <div class="text-center text-BO3 lg:text-T03 w-full max-w-[1100px] font-book">
                            <span @click="openMail" class="text-green cursor-pointer hidden lg:inline">Déjanos tu email </span>
                            <span class="lg:hidden">Déjanos tu </span>
                            <span @click="openMail" class="text-green cursor-pointer lg:hidden">email </span>
                            
                            <span>si quieres que te avisemos cuando se abra el registro del próximo curso</span>
                        </div>
                    </div>
                    <div v-else  class="px-3 lg:px-6 flex justify-center">
                         <div class="text-center text-BO3 lg:text-T03 w-full max-w-[1100px] font-book">
                            <span @click="openMail" class="text-green cursor-pointer hidden lg:inline">Escribe a master@esdmadrid.es </span>
                            <span class="lg:hidden">Escribe a</span>
                            <span @click="openMail" class="text-green cursor-pointer lg:hidden">master@esdmadrid.es </span>
                            
                            <span>si tienes alguna duda que resolver o consulta que quieras realizar</span>
                        </div>
                    </div>
                    <div class="w-full overflow-x-auto not-scrollbar">
                        <div class="grid grid-cols-1 lg:grid-cols-12 bg-g1 px-3 lg:px-6 pt-6 pb-24 min-w-[700px]">
                            <div class="lg:col-span-5">
                                <h3 class="text-BO3">{{ grupo?.titulo }}</h3>
                                <NuxtLink 
                                    v-if="grupo?.subtitulo"
                                    :to="grupo?.subtitulo?.url" 
                                    :target="grupo?.subtitulo?.target"
                                    class="text-g4 hover:text-green transition-colors duration-300 ease-in-out group flex items-center gap-1"
                                >
                                    <span>{{ grupo?.subtitulo?.title }}</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class="fill-g4 group-hover:fill-green transition-colors duration-300 ease-in-out" fill-rule="evenodd" clip-rule="evenodd" d="M14.6196 7.99855L9.65202 3.02637L8.80866 3.86972L12.3473 7.4041H1.63086V8.59299H12.3473L8.80866 12.1274L9.65202 12.9707L14.6196 7.99855Z"/>
                                    </svg>
                                </NuxtLink>
                            </div>
                            <div class="lg:col-start-6 lg:col-span-7 mt-4 lg:mt-0">
                                <div class="grid grid-cols-5 uppercase text-LM02 pb-3 border-b border-g3">
                                    <div v-for="(encabezado, index) in grupo?.tabla?.encabezados" :class="{ 'col-span-2' : index != 1 }">{{ encabezado?.encabezado }}</div>
                                </div>
                                <div v-for="cuerpo in grupo?.tabla?.cuerpo" class="grid grid-cols-5 text-BO3 border-b border-g3 py-3">
                                    <div v-for="(fila, index) in cuerpo?.fila" :class="{ 'col-span-2' : index != 1 }">{{ fila?.cuerpo }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <div 
            class="fixed top-0 left-0 w-full h-full flex items-end z-[99] pointer-events-none opacity-0 delay-1000" 
            :class="{ '!opacity-100 !pointer-events-auto !delay-0' : activeMail }"
        >
            <div class="bg-green w-full px-3 lg:px-6 pt-4 pb-9 lg:pb-11 translate-y-full transition-transform duration-1000 ease-in-out relative z-20" :class="{ '!translate-y-0' : activeMail }">
                <div class="w-full flex justify-end">
                    <span class="cursor-pointer text-BO4" @click="closeMail()">Cerrar</span>            
                </div>
                <div class="w-full grid grid-cols-1 lg:grid-cols-12 mt-10 lg:mt-0">
                    <form 
                        @submit.prevent="handleSubmit" 
                        name="Contact" 
                        data-netlify="true" 
                        netlify-honeypot="hpfield" 
                        method="POST"
                        class="lg:col-span-7 flex flex-col gap-4"
                    >
                        <input type="hidden" name="form-name" value="Contact">
                        <div class="border-b border-black flex text-BO3 lg:text-T03 py-2">
                            <input class="grow bg-[transparent] placeholder:text-[#04040650] appearance-none outline-none focus:outline-none focus:ring-0" required type="email" name="email" placeholder="Tu email">
                            <button type="submit">Enviar</button>
                        </div>
                        <div class="flex gap-1 items-center">
                            <input required type="checkbox" name="policy">
                            <label for="policy" class="text-L02 pt-0.5">Dejando tu correo aceptas la Política de Privacidad</label>
                        </div>
                    </form>
                </div>
                <div class="text-B03 lg:text-T03 absolute bottom-0 lg:bottom-[unset] lg:top-0 left-0 w-full lg:w-4/5 font-book leading-none lg:h-full flex flex-col justify-center px-6 py-10 lg:py-4 bg-green z-50 pointer-events-none opacity-0" :class="{'opacity-100 pointer-events-auto' : showInfo}">
                    <div>
                        Gracias por dejarnos tu email. <br>
                        Te avisaremos cuando se abra el registro del próximo curso.
                    </div>
                </div>
            </div>
            <CommonBackgroundBlur :load="activeMail" @click="closeMail()" />
        </div>
    </div>
</template>
<script setup>
import { useSiteStore } from '../../stores/site'
const siteStore = useSiteStore()

const props = defineProps({
    block: Object,
})

console.log(props.block)

const activeMail = ref(false)

const openMail = () => {
    activeMail.value = true;
    siteStore.overflowHidden = true
}
const closeMail = () => {
    activeMail.value = false;
    siteStore.overflowHidden = false
}

const showInfo = ref(false)



const handleSubmit = async (event) => {

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("/", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });
        if (response.ok) {
            showInfo.value = true
            console.log('Formulario enviado correctamente');
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.log("Error: " + error.message);
    }

}


</script>