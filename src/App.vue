<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import IconUpArrow from '@/components/icons/IconUpArrow.vue'
import { ref, computed} from 'vue'

const scroll = ref(0);
const showScrollButton = computed(() => scroll.value > 500);

window.addEventListener('scroll', () => {
    scroll.value = window.scrollY;
});
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
    <div class="bg-slate-300 max-w-screen min-h-screen">
        <Navbar />
        <div 
            v-if="showScrollButton"
            @click="scrollToTop"
            class="fixed flex-center btn-secondary hover:scale-110 bottom-5 right-5 w-10 h-10 z-50"
        >
            <IconUpArrow class="text-white" width="40" height="40" />
        </div>
        <div class="mx-5 pt-10 mt-10 xs:mt-0">
            <RouterView v-slot="{ Component }">
                <KeepAlive include="HomeView">
                    <component :is="Component" />
                </KeepAlive>
            </RouterView>
        </div>
    </div>
</template>

<style scoped>

</style>
