import React, { useEffect } from 'react'
import {
  AsyncStorage,
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'

//import { saveAuthDetails, getFavorites, getConfig, saveDeviceToken } from '../actions/auth'
import { blue } from '../config/colors'

const Launch = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    AsyncStorage.clear()
    //redirect()
  }, [])

  const redirect = async () => {
    // try {
    //   const station = await AsyncStorage.getItem('station')

    //   if (station) {
    //     dispatch(saveAuthDetails(station))
    //     dispatch(getFavorites(true))
    //     dispatch(getConfig(navigation))
    //     // navigation.navigate('Main')
    //   } else navigation.navigate('Auth')
    // } catch (err) {
    //   navigation.navigate('Auth')
    // }
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
