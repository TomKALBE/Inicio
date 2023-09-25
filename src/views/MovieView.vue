<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { useMovie } from '@/composables/useMovie';
import router from '@/router';
const { getMovieById, movie, isLoading, error } = useMovie()
const { id } = router.currentRoute.value.params
getMovieById(id as string)
window.scrollTo({ top: 0});
</script>
<template>
    <div>
        <button @click="router.back()" class="btn-secondary font-bold mt-7">Return</button>
        <div v-if="movie && !isLoading" class="mt-3 space-y-5">
            <h1 class="text-xl font-bold">{{ movie.title }}</h1>
            <div class="relative">
                <img class="rounded-md" :src="'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path" :alt="movie.title" />
                <div class="absolute flex-center top-3 left-3 bg-rose-600 rounded-lg h-5 w-8">
                    <p class="text-white font-bold text-sm">{{ movie.vote_average.toFixed(1) }}</p>
                </div>
            </div>
            <div class="flex flex-wrap first">
                <div class="flex-center py-[2px] bg-rose-600 px-3 rounded-xl text-white mr-2 my-1" v-for="genre in movie.genres" :key="genre.id">
                    <small class="font-bold">{{ genre.name }}</small>
                </div>
            </div>
            <p class=" max-w-[400px]">{{ movie.overview }}</p>
        </div>
        <Loading class="mt-20" v-if="isLoading"/>
        <small v-if="error" class="text-rose-600">{{ error.message }}</small>
    </div>
</template>