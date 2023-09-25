<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
    <div class="bg-slate-300 max-w-screen min-h-screen">
        <Navbar />
        <div class="mx-5 pt-10 mt-10 xs:mt-0">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>

</style>
