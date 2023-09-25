<script setup lang="ts">
import type { Movie } from '@/composables/useMovie';
import { formatDate } from '@/helpers'

type Props = {
    movie: Movie,
    index: number
};
defineProps<Props>()
</script>
<template>
    <div class="border border-slate-500 bg-slate-200 rounded-lg relative hover:opacity-80 cursor-pointer">
        <img class="rounded-t-md" :src="'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path" :alt="movie.title" />
        <div class="mx-1 mt-1">
            <h1 class="font-bold">{{ index + 1 }}. {{ movie.title }}</h1>
            <small>{{ formatDate(movie.release_date) }}</small>
            <div class="absolute flex-center top-2 left-2 bg-rose-600 rounded-lg w-8 h-5">
                <p class="text-white font-bold text-sm">{{ movie.vote_average.toFixed(1) }}</p>
            </div>
        </div>
    </div>
</template>