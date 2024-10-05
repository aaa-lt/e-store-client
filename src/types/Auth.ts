export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: string | null
  isAuthenticated: boolean
}
