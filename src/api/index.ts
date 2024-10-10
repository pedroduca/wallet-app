import axios from 'axios'

export const APIBase = axios.create({
  baseURL: 'http://localhost:3000',
})
