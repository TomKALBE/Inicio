import axios from 'axios'
import { computed, ref, type Ref } from 'vue'
export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    media_type: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

const movies: Ref<Movie[]> = ref([]) 
const error: Ref<Error | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)

export function useMovie() {

    const getMovies = async () => {
        try{
            isLoading.value = true
            const totalPagesToLoad = 3
            const newMovies: Movie[] = []

            for (let i = 1; i <= totalPagesToLoad; i++) {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/week?page=${i}`
                )
                newMovies.push(...data.results)
            }
            movies.value.push(...newMovies)
        }catch(err){
            console.log(err)
            error.value = err as Error
        }
    }
    return {
        movies: computed(() => movies.value.slice(0, 50)),
        error,
        getMovies
    }
}