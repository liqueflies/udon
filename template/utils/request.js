import axios from 'axios'
import Jsona from 'jsona'
import { cacheAdapterEnhancer } from 'axios-extensions'

import config from './config'

const jsonApiFormatter = new Jsona()

const request = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/json'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, 2 * 100)
})

request.interceptors.response.use(function (response) {
  // prevent double ugly data
  if (response && response.data.hasOwnProperty('data')) {
    return {
      ...response,
      data: jsonApiFormatter.deserialize(response.data),
      // meta: response.data.meta
    }
  } else {
    return response
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
