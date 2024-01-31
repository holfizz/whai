import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const $api = axios.create({
  baseURL:process.env.API_URL ,
  headers: {
    "Content-Type":'application/json',
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || "",
  },
})

$api.interceptors.request.use((config) => {
  const authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
  if (config.headers) {
    config.headers.Authorization =`Bearer ${authorization}}`
  }
  return config
})
