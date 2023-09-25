import axios from 'axios'
import { computed, reactive, ref, type Ref } from 'vue'
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
interface Sort {
    timeFrame: 'day' | 'week'
}

const movies: Ref<Movie[]> = ref([]) 
const error: Ref<Error | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)
const sort: Sort = reactive({
    timeFrame: 'day'
})
export function useMovie() {

    const getMovies = async () => {
        try{
            isLoading.value = true
            const totalPagesToLoad = 3
            const newMovies: Movie[] = []

            for (let i = 1; i <= totalPagesToLoad; i++) {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/${sort.timeFrame}?page=${i}`
                )
                newMovies.push(...data.results)
            }
            movies.value.push(...newMovies)
        }catch(err){
            console.log(err)
            error.value = err as Error
        }
    }

    const sortByTimeFrame = () => {
        if (sort.timeFrame === 'day') {
            sort.timeFrame = 'week'
        } else {
            sort.timeFrame = 'day'
        }
        movies.value = []
        getMovies()
    }
    return {
        movies: computed(() => movies.value.slice(0, 50)),
        error,
        sort,
        getMovies,
        sortByTimeFrame
    }
}