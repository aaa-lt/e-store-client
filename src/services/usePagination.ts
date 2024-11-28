import type { PaginationFilters, PaginationMeta } from '@/types/Search'
import { reactive, ref } from 'vue'

export function usePagination() {
  const paginationMeta = ref<PaginationMeta>({
    total_items: 0,
    total_pages: 0,
    current_page: 0,
    per_page: 0,
    remaining_items: 0
  })

  const paginationFilters = reactive<PaginationFilters>({
    page: 1,
    limit: 10
  })

  const paginationNextPage = () => {
    if (paginationFilters.page < paginationMeta.value.total_pages) {
      paginationFilters.page++
    }
  }

  const paginationPreviousPage = () => {
    if (paginationFilters.page > 1) {
      paginationFilters.page--
    }
  }

  const paginationSetLimit = (limit: number) => {
    const newPage = Math.ceil(
      (paginationMeta.value.current_page * paginationMeta.value.per_page) / limit
    )
    const newTotalPages = Math.ceil(paginationMeta.value.total_items / limit)

    paginationFilters.page = newPage > newTotalPages ? newTotalPages : newPage
    paginationFilters.limit = limit
  }

  return {
    paginationMeta,
    paginationFilters,
    paginationNextPage,
    paginationPreviousPage,
    paginationSetLimit
  }
}
