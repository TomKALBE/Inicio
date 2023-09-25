import axios from 'axios'
import { computed, reactive, ref, watch, type Ref } from 'vue'
import { usePagination } from './usePagination'
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
    timeFrame: 'day' | 'week',
    rating: 'asc' | 'desc' | null
}

const movies: Ref<Movie[]> = ref([]) 
const error: Ref<Error | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)
const pageAlreadyFetched: Ref = ref(0)

const sort: Sort = reactive({
    timeFrame: 'day',
    rating: null
})
const { pagination, nextPage } = usePagination()

export function useMovie() {

    watch(pagination, () => {
        if (!isLoading.value && pagination.page * pagination.perPage > movies.value.length) {
            getMovies()
        }
    })

    const getMovies = async () => {
        try{
            isLoading.value = true
            const totalPagesToLoad = 3
            const newMovies: Movie[] = []

            for (let i = pageAlreadyFetched.value + 1; i <= pageAlreadyFetched.value + totalPagesToLoad; i++) {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/trending/movie/${sort.timeFrame}?page=${i}`
                )
                pagination.totalPages = data.total_pages
                newMovies.push(...data.results)
            }
            movies.value.push(...newMovies)
            pageAlreadyFetched.value += totalPagesToLoad
        }catch(err){
            console.log(err)
            error.value = err as Error
        }finally{
            isLoading.value = false
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

    const sortByRating = () => {
        if (sort.rating === 'desc') {
            sort.rating = 'asc'
        } else {
            sort.rating = 'desc'
        }
    }

    const sortedMovies = computed(() => {
        const moviesToSort = [...movies.value.slice(0, pagination.page * pagination.perPage)]
        if (sort.rating === 'asc') {
            return moviesToSort.sort((a, b) => a.vote_average - b.vote_average)
        } else if (sort.rating === 'desc') {
            return moviesToSort.sort((a, b) => b.vote_average - a.vote_average)
        } else {
            return moviesToSort
        }
    })

    const clearSort = () => {
        sort.rating = null
    }

    return {
        movies: sortedMovies,
        isLoading: computed(() => isLoading.value),
        error,
        sort,
        pagination: computed(() => pagination),
        getMovies,
        sortByTimeFrame,
        sortByRating,
        clearSort,
        nextPage
    }
}