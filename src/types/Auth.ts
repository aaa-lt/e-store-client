export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User
  isAuthenticated: boolean
}

export interface User {
  email: string
  friendly_name: string
  id: number
  is_admin: boolean
  user_type: 'regular' | 'google'
  username: string
  profileImageUrl: string | undefined
  sasToken: string
}
