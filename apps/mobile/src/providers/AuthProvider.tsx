import { axiosInstance } from '@/libs/axios-instance'
import { User } from '@repo/schemas/user.schema'
import { isAxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import * as SecureStore from 'expo-secure-store'
type Credentials = {
  email: string
  password: string
}

type LoginResponseData = {
  session: User
  token: string
}

type AuthContext = {
  session?: User
  isLoading: boolean
  isAuthenticated: boolean
  getSession: () => void
  logIn: () => Promise<void>
  logOut: () => Promise<void>
  sigUp: (credentials: Credentials) => Promise<void>
}

const AuthContext = createContext<AuthContext>({
  isLoading: false,
  isAuthenticated: false,
  getSession: () => {},
  logIn: async () => {},
  logOut: async () => {},
  sigUp: async () => {},
})

const ACCESS_TOKEN_KEY = 'access-token-key'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAthenticated] = useState<boolean>(false)

  function getSession() {
    try {
    } catch (error) {}
  }

  async function sigUp(credentials: Credentials) {
    try {
      await axiosInstance.post('/user', credentials)
    } catch (error) {
      if (isAxiosError(error))
        Toast.show({
          type: 'error',
          text2: error.response?.data.message,
          position: 'top',
          visibilityTime: 3000,
        })
    }
  }
  async function logIn(credentials: Credentials) {
    try {
      setIsLoading(true)
      const { data } = await axiosInstance.post<LoginResponseData>('/user/login', credentials)

      setSession(data.session)
      setIsAthenticated(true)

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

      await SecureStore
    } catch (error) {
      Toast.show({
        type: 'error',
        text2: 'Email or Password is incorrect',
        position: 'top',
        visibilityTime: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function logOut() {}

  useEffect(() => {
    if (!session) getSession()
  }, [])

  return (
    <AuthContext.Provider value={{ session, isLoading, isAuthenticated, getSession, logIn, logOut, sigUp }}>
      {children}
    </AuthContext.Provider>
  )
}
