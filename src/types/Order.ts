import type { PaginationMeta } from './Search'

export interface Order {
  id: number
  user_id: number
  status: string
  order_date: string
  Products: [
    {
      id: number
      name: string
      price: number
      image_url: string
      OrderProduct: {
        quantity: number
      }
    }
  ]
}

export interface OrderResponse {
  meta: PaginationMeta
  items: Order[]
}
