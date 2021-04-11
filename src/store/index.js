import { createStore } from 'vuex'
import * as local from '@/utils/local'
import { isObject } from 'lodash'

export default createStore({
  state: {
    userInfo: local.get('userInfo') ? local.get('userInfo') : {}
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      if (isObject) {
        state.userInfo = userInfo
        local.set('userInfo', userInfo)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
