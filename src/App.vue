<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMovie } from '@/composables/useMovie';

const { sortByTimeFrame, sort } = useMovie()


</script>

<template>
    <div class="bg-slate-300 max-w-screen min-h-screen">
        <div class="fixed bg-rose-600 top-0 h-14 w-full z-50 flex justify-between items-center px-5">
            <h1 class="font-bold text-2xl text-white">Help me find a movie</h1>
            <div
                class="btn-secondary"
            >
                <button @click="sortByTimeFrame" class="text-rose-600 font-bold bg-slate-100 border-2 border-rose-500 px-2 py-1 rounded-md active:bg-slate-300 hover:scale-110 duration-300 cursor-pointer ">
                    Trend by: {{ sort.timeFrame === 'day' ? 'Week' : 'Day' }}
                </button>
            </div>
        </div>
        <div class="mx-5 pt-10">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>

</style>
