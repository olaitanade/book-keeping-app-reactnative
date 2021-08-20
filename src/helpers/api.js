import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { API_URL } from '../config/constants'
import NavigationService from '../navigation/NavigationService'

export const apiRequest = async (endpoint, method = 'get', body = {}, contentType = 'application/json') => {
  try {

    const url = `${API_URL}${endpoint}`
    const headers = {
      'Content-Type': contentType,
      'Accept': contentType,
    }

    const request = await axios.request(url, {
      data: method === 'get' ? null : body,
      method: method.toUpperCase(),
      headers: headers,
    })

    return request
  } catch (error) {
    console.log('api error', error.response)

    if (error?.response?.status === 401 && !endpoint.includes('register')){
      AsyncStorage.clear()
      NavigationService.navigate('Auth', {})

      return Promise.reject({})
    }

    return Promise.reject(error)
  }
}

export const showApiError = (
  message,
  tryAgain = true,
  tryAgainFunc = null,
  tryAgainText = 'Try Again',
  title = '',
) => {
  if (message) {
    Alert.alert(title, message, [
      { text: 'Dismiss' },
      tryAgain && {
        text: tryAgainText,
        onPress: tryAgainFunc,
      },
    ])
  }
}
