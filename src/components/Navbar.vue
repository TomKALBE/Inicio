<script setup lang="ts">
import { useMovie } from '@/composables/useMovie'
import IconDownArrow from './icons/IconDownArrow.vue';
import IconUpArrow from './icons/IconUpArrow.vue';
import IconXMark from './icons/IconXMark.vue';
const { sortByTimeFrame, sortByRating, clearSort, sort } = useMovie()

</script>
<template>
    <div class="fixed block bg-rose-600 top-0 h-14 w-full z-50">
        <div class="flex flex-col h-full items-start justify-between p-3 xs:flex-row xs:items-center ">
        
        <h1 class="font-bold text-xl xs:text-base md:text-2xl text-white">Help me find a movie</h1>
        <div class="flex space-x-5 mt-7 xs:mt-0">
            <div class="btn-secondary">
                <button
                    @click="sortByRating"
                    class="flex-center font-bold btn-primary"
                >
                    <div
                        v-if="sort.rating !== null"
                        @click.stop="clearSort"
                        class="group mr-2 border-rose-600 border rounded-full hover:bg-rose-600 active:bg-slate-100 active:border-rose-600"
                    >
                        <IconXMark class="group-hover:text-white group-active:text-rose-600 text-rose-600" />
                    </div>
                    Sort by rating:
                    <IconDownArrow class="ml-1 text-rose-600" v-if="sort.rating === 'desc'" />
                    <IconUpArrow class="ml-1 text-rose-600" v-else />
                </button>
            </div>
            <div class="btn-secondary">
                <button
                    @click="sortByTimeFrame"
                    class="font-bold btn-primary"
                >
                    Trend by: {{ sort.timeFrame === 'day' ? 'Week' : 'Day' }}
                </button>
            </div>
        </div>
        </div>
    </div>
</template>
