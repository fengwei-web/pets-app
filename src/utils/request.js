import axios from 'axios'

const request = axios.create({
  baseURL: 'http://aichong.api.laolin18.com'
})

export default request
