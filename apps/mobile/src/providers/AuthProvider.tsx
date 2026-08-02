import { axiosInstance } from '@/libs/axios-instance'
import { AuthStatus } from '@repo/enums/auth.enums'
import { User } from '@repo/schemas/user.schema'
import { isAxiosError } from 'axios'
import * as SecureStore from 'expo-secure-store'
import { createContext, ReactNode, useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
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
  status: AuthStatus
  logIn: (credentials: Credentials) => Promise<void>
  logOut: () => Promise<void>
  sigUp: (credentials: Credentials) => Promise<void>
}

const AuthContext = createContext<AuthContext>({
  status: AuthStatus.LOADING,
  logIn: async () => {},
  logOut: async () => {},
  sigUp: async () => {},
})

const ACCESS_TOKEN_KEY = 'access-token-key'

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<User>()
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED)

  async function getSession() {
    try {
      setStatus(AuthStatus.LOADING)

      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)

      if (!token) throw new Error('User is not logged in')

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const { data } = await axiosInstance.get<User>('/user/session')

      setSession(data)
      setStatus(AuthStatus.AUTHENTICATED)
    } catch (error) {
      setStatus(AuthStatus.UNAUTHENTICATED)
    }
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
      setStatus(AuthStatus.LOADING)
      const { data } = await axiosInstance.post<LoginResponseData>('/user/login', credentials)

      setSession(data.session)
      setStatus(AuthStatus.AUTHENTICATED)

      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.token)
    } catch (error) {
      setStatus(AuthStatus.UNAUTHENTICATED)

      Toast.show({
        type: 'error',
        text2: 'Email or Password is incorrect',
        position: 'top',
        visibilityTime: 3000,
      })
    }
  }

  async function logOut() {
    try {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)

      axiosInstance.defaults.headers.common['Authorization'] = ''

      setSession(undefined)
      setStatus(AuthStatus.UNAUTHENTICATED)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: 'Something went wrong',
        position: 'top',
        visibilityTime: 3000,
      })
    }
  }

  //   useEffect(() => {
  //     if (!session) getSession()
  //   }, [])

  return <AuthContext.Provider value={{ session, status, logIn, logOut, sigUp }}>{children}</AuthContext.Provider>
}
