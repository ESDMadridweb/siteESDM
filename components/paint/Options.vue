<template>
    <div class="absolute top-[42%] -translate-y-1/2 left-6 flex flex-col gap-2 p-2 rounded-[10px] bg-g1 z-20">
        <div ref="select" class="button"  @click="() => handle('select')" :class="{'button-active' : itemSelected == 'select'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M19.1071 8.34004L10.878 10.4455L10.5335 10.5332L10.4458 10.8778L8.33894 19.1096L1.35833 1.35943L19.1071 8.34004Z" stroke="#040406" stroke-width="1.2"/>
            </svg>
        </div>
        <div ref="text" class="button" @click="() => handle('text')" :class="{'button-active' : itemSelected == 'text'}">
            <svg class="scale-150" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3368 12.5344L9 12.2123L10.3077 7H24.6923L26 12.2123L24.6923 12.5344L23.6462 8.37628H18.1829V25.6237H21.4085V27H13.5915V25.6237H16.8171V8.37628H11.3538L10.3368 12.5344Z" fill="black"/>
            </svg>
        </div>
        <div ref="draw" class="button" @click="() => handle('draw')" :class="{'button-active' : itemSelected == 'draw'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                <path d="M4.94608 1.87512L17.75 14.679L14.1385 18.2905L1.33459 5.48661L0.904386 1.44492L4.94608 1.87512Z" stroke="#040406" stroke-width="1.2"/>
            </svg>
        </div>
        <div ref="clear" class="button" @click="() => handle('clear')" :class="{'button-active' : itemSelected == 'clear'}">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0366 6.58584L14.5621 0.970014C14.1257 0.523301 13.4148 0.523301 12.9784 0.970014L0.944533 13.2865C0.508072 13.7333 0.508072 14.4608 0.944533 14.9075L4.96916 18.8889H9.39021L20.0366 8.20677C20.473 7.76006 20.473 7.03255 20.0366 6.58584Z" stroke="#040406" stroke-width="1.2" stroke-miterlimit="10"/>
            </svg>
        </div>
        <div ref="color" class="button" :class="{'button-active' : itemSelected == 'color'}">
            <input type="color" class="color-circle" @input="(e) => handle(e.target.value)">
        </div>
    </div>
</template>
<script setup>
const select = ref(null)
const text = ref(null)
const draw = ref(null)
const clear = ref(null)
const color = ref(null)

const emit = defineEmits(['update:itemSelected', 'clear', 'update:colorSelected'])

const itemSelected = ref('select')

const handle = (el) => {
  if (typeof el === 'string' && el.startsWith('#')) {
    itemSelected.value = 'color'
    emit('update:colorSelected', el)
  } else {
    itemSelected.value = el
  }
  emit('update:itemSelected', itemSelected.value)
  if(itemSelected.value == 'clear') emit('clear')
}
</script>
<style scoped>
.button{
    @apply rounded-[8px] p-3 aspect-square flex justify-center items-center cursor-pointer transition-colors duration-300 ease-in-out
}
.button svg{
    @apply w-6 h-6
}
.button-active{
    @apply bg-blue
}
.color-circle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  background: none;
}

.color-circle::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 50%;
}

.color-circle::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

.color-circle::-moz-color-swatch {
  border: none;
  border-radius: 50%;
}
</style>