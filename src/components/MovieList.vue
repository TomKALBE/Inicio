<script setup lang="ts">
import { useMovie } from '@/composables/useMovie';
import MovieItem from '@/components/MovieItem.vue'
import Loading from './Loading.vue';
const { getMovies, movies, isLoading, error } = useMovie()
getMovies()

</script>
<template>
   <div class="relative">
        <h1 class="font-bold text-xl mt-10">Trending List</h1>
     
        <div class="mt-5 grid gap-10 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3">
            <template v-for="(movie, index) in movies" :key="movie.id + '-' +  index">
                <MovieItem :movie="movie" :index="index" />
            </template>
        </div>
        <small v-if="error" class="text-rose-600">{{ error.message }}</small>
        <Loading v-if="isLoading" class="mt-10" />
    </div>
</template>