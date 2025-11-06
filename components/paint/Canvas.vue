<template>
  <div class="paint-container absolute -top-8 w-full h-full z-10">
    <canvas
      ref="canvas"
      tabindex="0"
      class="w-full h-full"
      :class="{'cursor-crosshair': canPaint, 'cursor-text' : canWrite}"
      :width="width"
      :height="height"
      @mousedown="handleMouseDown"
      @mouseup="endPosition"
      @mousemove="draw"
      @keydown="handleKeyDown"
    ></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: '#000000' },
  canPaint: { type: Boolean, default: false },
  canWrite: { type: Boolean, default: false }
})

const canvas = ref(null)
const painting = ref(false)
const size = ref(15)
const width = ref(0)
const height = ref(0)

let ctx
const textPos = ref({ x: 0, y: 0 })
const writing = ref(false)
let currentText = ''

let savedImage = null

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  ctx.lineCap = 'round'
  canvas.value.focus()

  width.value = window.innerWidth
  height.value = window.innerHeight - 50
})

function handleMouseDown(e) {
  canvas.value.focus()
  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  if (props.canWrite) {
    textPos.value = { x, y }
    writing.value = true
    currentText = ''
    saveCanvasImage()
  } else if (props.canPaint) {
    startPosition(e)
  }
}

function startPosition(e) {
  painting.value = true
  draw(e)
}

function endPosition() {
  painting.value = false
  ctx.beginPath()
}

function draw(e) {
  if (!props.canPaint || !painting.value) return

  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  ctx.strokeStyle = props.color
  ctx.lineWidth = size.value

  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x, y)
}

function handleKeyDown(e) {
  if (!props.canWrite || !writing.value) return

  if (e.key === 'Backspace') {
    currentText = currentText.slice(0, -1)
  } else if (e.key.length === 1) {
    currentText += e.key
  }

  redrawCanvas()
}

function saveCanvasImage() {
  savedImage = ctx.getImageData(0, 0, width.value, height.value)
}

function redrawCanvas() {
  // Restaurar dibujo previo
  if (savedImage) ctx.putImageData(savedImage, 0, 0)

  // Dibujar el texto actual
  ctx.fillStyle = props.color
  ctx.font = `${size.value * 5}px PKiko`
  ctx.fillText(currentText, textPos.value.x, textPos.value.y)
}

function clearCanvas() {
  ctx.clearRect(0, 0, width.value, height.value)
  savedImage = null
}

function downloadCanvasAsPNG(filename = 'canvas-image.png') {
  if (!canvas.value) return

  // Convertir canvas a dataURL en JPG
  const dataURL = canvas.value.toDataURL('image/png', 0.9)

  // Crear enlace temporal
  const link = document.createElement('a')
  link.href = dataURL
  link.download = filename

  // Simular click para descargar
  link.click()
}

async function uploadCanvasToPNG() {
  if (!canvas.value) return
  try {
    const dataURL = canvas.value.toDataURL('image/png')
    const response = await fetch('/.netlify/functions/postDraw', {
      method: 'POST',
      body: JSON.stringify({ image: dataURL })
    })
    const result = await response.json()
    if (result.success) {
      console.log('✅ Imagen subida con éxito', result?.data)
    } else {
      console.error('❌ Error subiendo la imagen:', result.message)
    }

  } catch (error) {
    console.error('🔥 Error en la petición:', error)
  }
}


defineExpose({
  clearCanvas,
  downloadCanvasAsPNG,
  uploadCanvasToPNG
})
</script>

<style scoped>
.paint-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
canvas {
  margin-top: 10px;
  outline: none;
}
.cursor-crosshair {
  cursor: crosshair;
}
</style>
