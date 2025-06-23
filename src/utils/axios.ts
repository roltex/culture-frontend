import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
})

export default instance
