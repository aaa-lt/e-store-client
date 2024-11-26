import type { PaginationMeta } from './Search'

interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  Category: { id: number; name: string }
  Supplier: { id: number; name: string }
  image_url: string
  isAdded: boolean
  userQuantity: number
}

interface ProductResponse {
  meta: PaginationMeta
  items: Product[]
}

type ImageSizes = 'full' | 'middle' | 'low' | 'potato'

type FetchStatus = 'loading' | 'success' | 'error'

export type { Product, ProductResponse, ImageSizes, FetchStatus }
