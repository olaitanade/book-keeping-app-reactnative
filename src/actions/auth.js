import axios from 'axios'
import { Alert } from 'react-native'

import {
  SAVE_TOKEN,
  SAVE_USER,
  SIGN_OUT,
  LOADING,
  REFRESHING,
  GET_CURRENT_USER,
} from '../types'
import NavigationService from '../navigation/NavigationService'
import { apiRequest, showApiError } from '../helpers/api'
import { API_URL } from '../config/constants'

export const signOut = () => ({
  type: SIGN_OUT,
})

export const saveUser = (token, user) => (dispatch) => {
  dispatch({
    type: SAVE_TOKEN,
    payload: token,
  })

  dispatch({
    type: SAVE_USER,
    payload: user,
  })

  dispatch(getUserData(true))
}

export const login = (user) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/users/login', 'post', user)
    .then(({ data }) => {
      console.log('login', data)

      const {
        data: {
          expiresIn,
          token: accessToken,
          refreshToken,
          user: userData,
        },
      } = data
      dispatch(saveUser({ expiresIn, accessToken, refreshToken }, userData))
      NavigationService.navigate('Home')
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(login(user)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const forgotPassword = (email) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/users/forgotPassword', 'post', { email })
    .then(({ data }) => {
      console.log('forgot password', data)

      Alert.alert(
        'Request successful',
        'Your request to reset your password was successful. Please check your email for further instructions',
        [{ text: 'Dismiss' }],
      )
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(forgotPassword(email)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const getUserData = (navigate = false) => (dispatch, getState) => {
  const { user } = getState().auth

  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest(`/users/${user?.id}`)
    .then(({ data }) => {
      console.log('profile', data)

      dispatch({
        type: GET_CURRENT_USER,
        payload: data.data,
      })

      if (navigate) NavigationService.navigate('Main', {})
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(getUserData()))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const requestOTP = (doneFunction) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  apiRequest('/users/otp', 'post')
    .then(({ data }) => {
      console.log('otp', data)
      doneFunction?.()
    })
    .catch((err) => {
      showApiError(err, true, () => dispatch(requestOTP(doneFunction)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const uploadSignatureWithOTP = (image, otp) => (dispatch, getState) => {
  const { user, token } = getState().auth

  dispatch({
    type: LOADING,
    payload: true,
  })

  const formData = new FormData()
  formData.append('Signature', {
    name: image.uri?.split('/').pop(),
    uri: image?.uri,
    type: 'image/*',
  })
  formData.append('OtpToken', otp)
  formData.append('FirstName', user?.lastName)
  formData.append('LastName', user?.firstName)

  axios
    .patch(`${API_URL}/users/${user?.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then(({ data }) => {
      console.log('upload signature', data)

      Alert.alert(
        '',
        'Signature uploaded successfully',
        [{ text: 'Dismiss' }],
      )

      dispatch(getUserData())
      NavigationService.navigate('Signature')
    })
    .catch((err) => {
      console.log(err?.response?.data ?? err?.message)
      showApiError(err, true, () => dispatch(uploadSignatureWithOTP(image, otp)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const uploadSignatureWithBiometrics = (image) => (dispatch, getState) => {
  const { user, token } = getState().auth

  dispatch({
    type: LOADING,
    payload: true,
  })

  const formData = new FormData()
  formData.append('Signature', {
    name: image.uri?.split('/').pop(),
    uri: image?.uri,
    type: 'image/*',
  })

  axios
    .patch(`${API_URL}/users/${user?.id}/signature`, formData, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then(({ data }) => {
      console.log('upload signature', data)

      Alert.alert(
        '',
        'Signature uploaded successfully',
        [{ text: 'Dismiss' }],
      )

      dispatch(getUserData())
      NavigationService.navigate('Signature')
    })
    .catch((err) => {
      console.log(err?.response?.data ?? err?.message)
      showApiError(err, true, () => dispatch(uploadSignatureWithBiometrics(image)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const updateProfilePicture = (image) => (dispatch, getState) => {
  const { user, token } = getState().auth

  const formData = new FormData()
  // formData.append('FirstName', user?.firstName)
  // formData.append('LastName', user?.lastName)
  formData.append('photo', {
    name: image.uri?.split('/').pop(),
    uri: image?.uri,
    type: 'image/*',
  })

  dispatch({
    type: REFRESHING,
    payload: true,
  })

  axios
    .post(`${API_URL}/users/${user?.id}/profilePicture`, formData, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then(({ data }) => {
      console.log('update profile picture', data)

      Alert.alert(
        '',
        'Profile updated successfully',
        [{ text: 'Dismiss' }],
      )

      dispatch({
        type: SAVE_USER,
        payload: { ...user, ...data.data },
      })
    })
    .catch((err) => {
      console.log(err?.response?.data ?? err?.message)
      showApiError(err, true, () => dispatch(updateProfilePicture(image)))
    })
    .finally(() => {
      dispatch({
        type: REFRESHING,
        payload: false,
      })
    })
}

export const updateProfile = (userData) => (dispatch, getState) => {
  const { user, token } = getState().auth

  const formData = new FormData()
  formData.append('FirstName', userData.firstName)
  formData.append('LastName', userData.lastName)
  formData.append('Gender', userData.gender)
  formData.append('Phone', userData.phone)
  formData.append('HomeAddress', userData.address)
  formData.append('JobTitle', userData.jobTitle)

  dispatch({
    type: LOADING,
    payload: true,
  })

  axios
    .patch(`${API_URL}/users/${user?.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then(({ data }) => {
      console.log('update profile', data)

      Alert.alert(
        '',
        'Profile updated successfully',
        [{ text: 'Dismiss' }],
      )

      dispatch({
        type: SAVE_USER,
        payload: { ...user, ...data.data },
      })
    })
    .catch((err) => {
      console.log(err?.response?.data ?? err?.message)
      showApiError(err, true, () => dispatch(updateProfile(userData)))
    })
    .finally(() => {
      dispatch({
        type: LOADING,
        payload: false,
      })
    })
}

export const changePassword = (userData) => (dispatch, getState) => {
  const { user, token } = getState().auth

  const formData = new FormData()
  formData.append('OldPassword', userData.old)
  formData.append('NewPassword', userData.new)
  formData.append('FirstName', user?.firstName)
  formData.append('LastName', user?.lastName)

  dispatch({
    type: REFRESHING,
    payload: true,
  })

  axios
    .patch(`${API_URL}/users/${user?.id}/signature`, formData, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then(({ data }) => {
      console.log('change password', data)

      Alert.alert(
        '',
        'Password changed successfully',
        [{ text: 'Dismiss' }],
      )
    })
    .catch((err) => {
      console.log(err?.response?.data ?? err?.message)
      showApiError(err, true, () => dispatch(changePassword(userData)))
    })
    .finally(() => {
      dispatch({
        type: REFRESHING,
        payload: false,
      })
    })
}
