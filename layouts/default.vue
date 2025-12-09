<template>
    <div class="flex flex-col min-h-svh">
        <CommonHeader />
        <main class="relative grow">
            <slot />
        </main>
        <CommonFooter />
        <CommonAhoraMismo v-if="route.name.startsWith('index__')" />
        <CommonMouseFollower class="transition-opacity duration-500 ease-in-out">
            <div class="relative">
                <div 
                    class="w-5 h-5 bg-green rounded-full transition-all duration-500 ease-in-out flex flex-col justify-center items-center text-center"
                    :class="{
                        '!w-40 !h-40 blur-[5px] ' : cursorStore.active && cursorStore.title == '',
                        '!w-60 !h-60 blur-[5px] ' : cursorStore.active && cursorStore.title != '',
                        '!bg-black' : menuStore.isOpened
                    }"
                ></div>
                <div 
                    class="absolute px-2 top-0 left-0 !w-full h-full flex flex-col justify-center items-center text-center opacity-0 transition-opacity duration-100 delay-200 pointer-events-none" 
                    :class="{ 
                        '!w-56' : cursorStore.title != '',
                        '!opacity-100' : cursorStore.active
                    }"
                >
                    <span v-if="cursorStore.title != ''" class="text-BO4">{{ cursorStore.title }}</span>
                    <span v-if="cursorStore.subtitle != ''" class="opacity-40 text-BO4">{{ cursorStore.subtitle }}</span>
                    <span v-if="cursorStore.text != ''" class="text-BO3">{{ cursorStore.text }}</span>
                </div>
            </div>
        </CommonMouseFollower>
    </div>
</template>

<script setup>
const route = useRoute()
const cursorStore = useCursorStore()
const menuStore = useMenuStore()
</script>