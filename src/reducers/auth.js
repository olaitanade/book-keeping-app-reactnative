import { AsyncStorage } from 'react-native'
import {
  SAVE_TOKEN,
  SIGN_OUT,
  SAVE_USER,
  GET_CURRENT_USER,
} from '../types'

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  userData: null,
  signupErrors: {},
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_TOKEN:
      AsyncStorage.setItem('token', JSON.stringify(payload))

      return {
        ...state,
        token: payload,
        isLoggedIn: true,
      }
    case SAVE_USER:
      AsyncStorage.setItem('user', JSON.stringify(payload))

      return {
        ...state,
        user: payload,
      }
    case SIGN_OUT:
      AsyncStorage.multiRemove(['token', 'user'])

      return {
        ...state,
        token: null,
        user: null,
        isLoggedIn: false,
      }
    case GET_CURRENT_USER:
      return {
        ...state,
        userData: payload,
      }
    default:
      return state
  }
}

export default authReducer
