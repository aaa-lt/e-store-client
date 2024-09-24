export interface SortOption {
  name: string
  value: string
  current: boolean
}

export interface Filters {
  sortBy?: string
  searchQuery?: string
  categoryName?: string
  supplierName?: string
  minPrice?: number
  maxPrice?: number
  creationDate?: string
  page: number
}

export interface PaginationMeta {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_items: number
}
