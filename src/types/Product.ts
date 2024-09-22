export interface Product {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  Category: { id: number; name: string }
  Supplier: { id: number; name: string }
}
