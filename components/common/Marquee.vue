<template>
    <div class="w-full relative">
      <div 
        ref="wrapper" 
        class="flex flex-nowrap whitespace-nowrap gap-24 h-full"
        :style="{ transform: `translateX(${offset}px)`, transition: 'none' }"
      >
        <div class="content flex flex-nowrap whitespace-nowrap gap-24 h-full">
          <slot />
        </div>
        <div class="content flex flex-nowrap whitespace-nowrap gap-24 h-full">
          <slot />
        </div>
        <div class="content flex flex-nowrap whitespace-nowrap gap-24 h-full">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const wrapper = ref(null);
  const offset = ref(0);
  const speed = 0.2;
  let animationFrame;
  
  const animate = () => {
    offset.value -= speed;
    if (wrapper.value) {
      const contents = wrapper.value.children;
      if (contents.length > 0) {
        const firstChild = contents[0];
        if (Math.abs(offset.value) >= firstChild.offsetWidth) {
          wrapper.value.appendChild(firstChild);
          offset.value = 0;
        }
      }
    }
    animationFrame = requestAnimationFrame(animate);
  };
  
  onMounted(() => {
    animationFrame = requestAnimationFrame(animate);
  });
  
  onUnmounted(() => {
    cancelAnimationFrame(animationFrame);
  });
  </script>
  
  <style scoped>
    div {
      display: flex;
      align-items: center;
    }
  </style>