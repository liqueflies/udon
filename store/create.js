import request from '@/utils/request'
import { ASYNC_REQUEST_ROUTINE, CLEAR_MODULE_ROUTINE } from '@/utils/config'

const SET_RESPONSE_DATA = 'SET_RESPONSE_DATA'
// const SET_RESPONSE_META = 'SET_RESPONSE_META'
const SET_IS_PENDING = 'SET_IS_PENDING'
const SET_STATUS_CODE = 'SET_STATUS_CODE'
const SET_ERRORS = 'SET_ERRORS'

const createState = () => {
  return {
    isPending: true,
    statusCode: null,
    data: null,
    meta: null,
    errors: null
  }
}

const createMutations = () => {
  return {
    [SET_RESPONSE_DATA]: (state, data) => {
      state.data = data
      return state.data
    },
    // [SET_RESPONSE_META]: (state, meta) => {
    //   state.meta = meta
    //   return state.meta
    // },
    [SET_IS_PENDING]: (state, isPending) => {
      state.isPending = isPending
      return state.isPending
    },
    [SET_STATUS_CODE]: (state, status) => {
      state.statusCode = status
      return state.statusCode
    },
    [SET_ERRORS]: (state, errors) => {
      state.errors = errors
      return state.errors
    }
  }
}

const createActions = () => {
  return {
    [ASYNC_REQUEST_ROUTINE] ({ commit }, endpoint) {
      return new Promise((resolve, reject) => {
        request.get(endpoint)
          .then(response => {
            commit(SET_RESPONSE_DATA, response.data)
            // commit(SET_RESPONSE_META, response.meta)
            commit(SET_STATUS_CODE, response.status)
            commit(SET_IS_PENDING, false)
            resolve(response)
          })
          .catch(response => {
            commit(SET_ERRORS, response.errors)
            commit(SET_STATUS_CODE, response.status)
            commit(SET_IS_PENDING, false)
            reject(response)
          })
      })
    },
    [CLEAR_MODULE_ROUTINE] ({ commit }) {
      const {
        isPending,
        statusCode,
        data,
        // meta,
        errors
      } = createState()
      // clear committing
      commit(SET_RESPONSE_DATA, data)
      // commit(SET_RESPONSE_META, meta)
      commit(SET_STATUS_CODE, statusCode)
      commit(SET_IS_PENDING, isPending)
      commit(SET_ERRORS, errors)
    }
  }
}

export default function create () {
  return {
    namespaced: true,
    state: createState(),
    mutations: createMutations(),
    actions: createActions()
  }
}
