import { reactive } from "vue"

export function usePagination () {
    const pagination = reactive ({
        page: 1,
        perPage: 50,
        totalPages: 0
    })

    const nextPage = () => {
        if(pagination.page < pagination.totalPages){
            pagination.page++
        }
    }

    return {
        pagination,
        nextPage
    }
}