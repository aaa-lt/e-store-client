import type { PaginationMeta } from './Search'

export interface Product {
  id: number
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

export interface ProductResponse {
  meta: PaginationMeta
  items: Product[]
}

export type ImageSizes = 'full' | 'middle' | 'low' | 'potato'
