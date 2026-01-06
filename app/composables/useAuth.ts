// composables/useAuth.ts
export const useAuth = () => {
  const user = useState<any | null>('auth_user', () => null)
  const token = useState<string | null>('auth_token', () => null)

  const setAuth = (newUser: any, newToken: string) => {
    user.value = newUser
    token.value = newToken
    if (import.meta.client) {
      localStorage.setItem('auth_user', JSON.stringify(newUser))
      localStorage.setItem('auth_token', newToken)
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
    }
  }

  // restore on client refresh
  if (import.meta.client && !user.value) {
    const savedUser = localStorage.getItem('auth_user')
    const savedToken = localStorage.getItem('auth_token')
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
    }
  }

  return { user, token, setAuth, clearAuth }
}
