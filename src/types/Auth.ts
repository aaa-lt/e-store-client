export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User
  isAuthenticated: boolean
}

export interface User {
  email: string
  friendly_name: string
  id: string
  is_admin: boolean
  user_type: 'regular' | 'google'
  username: string
  profileImageUrl: string | undefined
  sasToken: string
  phone_number: string
  age: number
  delivery_address: string
  newsletter_opt_in: boolean
}
