import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gerasdatabase.up.railway.app/api/v1'
})

export { api };