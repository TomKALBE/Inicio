<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
    <div class="bg-slate-300 max-w-screen min-h-screen">
        <h1 class="font-bold text-2xl">Help me find a movie</h1>
        <div class="mx-5">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>

</style>
