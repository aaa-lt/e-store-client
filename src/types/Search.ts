export interface SortOption {
  name: string
  value: string
  current: boolean
}

export interface ProductFilters {
  sortBy?: string
  searchQuery?: string
  categoryName?: string
  supplierName?: string
  minPrice?: number
  maxPrice?: number
  fromDate?: string
  toDate?: string
}

export interface PaginationFilters {
  page: number
  limit: number
}

export interface OrdersFilters {
  status?: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
  period?: '1w' | '1m' | '3m' | '6m' | '1y'
}

export interface PaginationMeta {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_items: number
}
