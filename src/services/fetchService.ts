import type { ProductResponse } from '@/types/Product'
import type { OrderResponse, Order } from '@/types/Order'
import type { Filters } from '@/types/Search'
import axios from 'axios'
import AxiosInstance from '@/services/axiosInstance'

const APIUrl = 'http://' + import.meta.env.VITE_SERVER_HOST + ':' + import.meta.env.VITE_SERVER_PORT

export const getProducts = async (params: Filters): Promise<ProductResponse> => {
  const { data } = await axios.get<ProductResponse>(APIUrl + '/products', {
    params
  })
  return data
}

export const getOrders = async (params: Filters): Promise<OrderResponse> => {
  const { data } = await AxiosInstance.get<OrderResponse>(APIUrl + '/orders', {
    params
  })
  return data
}

export const getOrderById = async (id: number): Promise<Order> => {
  const { data } = await AxiosInstance.get<Order>(APIUrl + '/orders/' + id)
  return data
}
