import type { Filters, PaginationMeta } from '@/types/Search'
import { reactive, ref } from 'vue'

export function usePagination() {
  const paginationMeta = ref<PaginationMeta>({
    total_items: 0,
    total_pages: 0,
    current_page: 0,
    per_page: 0,
    remaining_items: 0
  })

  const filters = reactive<Filters>({
    page: 1,
    limit: 10
  })

  const paginationNextPage = () => {
    if (filters.page < paginationMeta.value.total_pages) {
      filters.page++
    }
  }

  const paginationPreviousPage = () => {
    if (filters.page > 1) {
      filters.page--
    }
  }

  const paginationSetLimit = (limit: number) => {
    const newPage = Math.ceil(
      (paginationMeta.value.current_page * paginationMeta.value.per_page) / limit
    )
    const newTotalPages = Math.ceil(paginationMeta.value.total_items / limit)

    filters.page = newPage > newTotalPages ? newTotalPages : newPage
    filters.limit = limit
  }

  return {
    paginationMeta,
    filters,
    paginationNextPage,
    paginationPreviousPage,
    paginationSetLimit
  }
}
