export interface SortOption {
  name: string
  value: string
  current: boolean
}

export interface Filters {
  sortBy?: string
  searchQuery?: string
}
