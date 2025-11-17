<template>
    <div ref="wrapper" class="relative flex justify-end h-[var(--height)] flex-col" :style="{'--height' : images.length * 50 + 'svh'}">
        <div v-for="(image, index) in images" class="flex-1 sentinel"></div>
        <div class="absolute top-0 left-0 w-full h-full flex justify-end lg:px-6 ">
            <div class="sticky top-6 h-[90vh] lg:h-[80vh] w-full lg:w-[58.4%]">
                <CommonImage 
                    v-for="(image, index) in images"
                    width="1920"
                    class="h-full object-center object-contain absolute bottom-0 right-0 scroll-image"
                    :class="{
                        'left-0 lg:object-bottom bottom-0 w-full !object-cover' : index == 0,
                        'right-0 object-right-bottom lg:object-right-bottom w-3/4' : index == 1,
                        'right-0 object-left-top lg:object-right-bottom w-1/2' : index  == 2,
                        'opacity-0' : currentImage < index
                    }"
                    :src="image?.sizes?.large"
                    :alt="image?.alt"
                />
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    images: Array,
})

const wrapper = ref(null)
let observer = null;
const currentImage = ref(0)

const checkSentinel = () => {
    const sentinels = wrapper.value.querySelectorAll('.sentinel');
    let lastVisibleIndex = currentImage.value;

    sentinels.forEach((sentinel, index) => {
        const rect = sentinel.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            lastVisibleIndex = index;
        }
    });
    currentImage.value = lastVisibleIndex;
}

onMounted(() => {
    window.addEventListener('scroll', checkSentinel);
    window.addEventListener('resize', checkSentinel);

    checkSentinel();
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkSentinel);
    window.removeEventListener('resize', checkSentinel);
});

</script>