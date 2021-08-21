import React, { useEffect } from 'react'
import {
  AsyncStorage,
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { saveUser } from '../actions/auth'
import { blue } from '../config/colors'

const Launch = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    //AsyncStorage.clear()
    redirect()
  }, [])

  const redirect = async () => {
    try {
      const user = await AsyncStorage.getItem('user')
      const token = await AsyncStorage.getItem('token')

      if (token && user) {
        dispatch(saveUser(JSON.parse(token), JSON.parse(user)))
      } else navigation.navigate('Onboarding')
    } catch (err) {
      console.log('launch error', err)
      navigation.navigate('Onboarding')
    }
  }

  return (
    <View style={styles.container} >
        <StatusBar
          translucent
          backgroundColor="#0000"
          animated
          barStyle="light-content"
        />
        <ActivityIndicator
          color={blue}
          size="large"
          animating
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default Launch
