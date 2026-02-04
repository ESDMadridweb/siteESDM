<template>
    <div class="sticky top-20 px-3 lg:px-6 w-fit z-30 mt-4 lg:mt-20 mb-8 lg:mb-0 h-auto lg:h-0">
        <div class="text-LM02 flex flex-col gap-[2px] lg:gap-0 uppercase">
            <div v-for="(section, index) in sections" class="flex items-center gap-2 cursor-pointer">
                <svg :class="{ 'opacity-0' : currentSection != index }" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" fill="#36E452"/>
                </svg>
                <span @click="navTo(index, section.id)">{{section.title[locale]}}</span>
            </div>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({
    sections: Array,
})

const { locale } = useI18n()

const currentSection = ref(0);

const navTo = (index, id) => {
  const section = document.querySelector(`#${id}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const updateCurrentSectionOnScroll = () => {
  let closestIndex = -1;
  let closestDistance = Infinity;

  props.sections.forEach((section, index) => {
    const el = document.querySelector(`#${section.id}`);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top - 20;
      if (offsetTop <= 0 && Math.abs(offsetTop) < closestDistance) {
        closestDistance = Math.abs(offsetTop);
        closestIndex = index;
      }
    }
  });

  if (closestIndex !== -1 && currentSection.value !== closestIndex) {
    currentSection.value = closestIndex;

    const section = props.sections[currentSection.value];
    const hash = `#${encodeURIComponent(section?.id)}`;

    if (window.location.hash !== hash) {
      history.replaceState(history.state, '', hash);
    }
    
  }
};

let throttleTimeout;
const throttledUpdate = () => {
  if (!throttleTimeout) {
    throttleTimeout = setTimeout(() => {
      updateCurrentSectionOnScroll();
      throttleTimeout = null;
    }, 100);
  }
};

onMounted(() => {
  window.addEventListener('scroll', throttledUpdate);
  setTimeout(() => {
    updateCurrentSectionOnScroll()
  }, 1000);
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttledUpdate);
});

</script>