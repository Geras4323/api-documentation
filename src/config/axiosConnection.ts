import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  // baseURL: 'https://gerasdatabase.up.railway.app/api/v1'
  baseURL: 'http://localhost:5000/api/v1'
})

export { api };