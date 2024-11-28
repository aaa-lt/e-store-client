import type { ProductResponse } from '@/types/Product'
import type { OrderResponse, Order } from '@/types/Order'
import type { ProductFilters, PaginationFilters, OrdersFilters } from '@/types/Search'
import api, { baseUrl } from '@/services/axiosInstance'

const getProducts = async (
  params: ProductFilters & PaginationFilters
): Promise<ProductResponse> => {
  const { data } = await api.get<ProductResponse>(`${baseUrl}/products`, {
    params
  })

  return data
}

const getOrders = async (params: OrdersFilters & PaginationFilters): Promise<OrderResponse> => {
  const { data } = await api.get<OrderResponse>(`${baseUrl}/orders`, {
    params
  })

  return data
}

const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await api.get<Order>(`${baseUrl}/orders/${id}`)

  return data
}

export { getProducts, getOrders, getOrderById }
