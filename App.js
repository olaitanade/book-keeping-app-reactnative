import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native'
import { Provider } from 'react-redux'
import { useFonts } from '@use-expo/font'
import * as Updates from 'expo-updates'
import store from './src/store'
import Navigation from './src/navigation'
import { backgroundGrey } from './src/config/colors'
//import { saveNotification, showPushNotification, handleNotification } from './src/actions/auth'

const customFonts = {
  UbuntuLight: require('./src/assets/fonts/Ubuntu/Ubuntu-Light.ttf'),
  UbuntuRegular: require('./src/assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
  UbuntuMedium: require('./src/assets/fonts/Ubuntu/Ubuntu-Medium.ttf'),
  UbuntuBold: require('./src/assets/fonts/Ubuntu/Ubuntu-Bold.ttf'),
}

const App = () => {
  const [fontsLoaded] = useFonts(customFonts)

  useEffect(() => {

    if (!__DEV__) {
      Updates
        .checkForUpdateAsync()
        .then(async (update) => {
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync()
            await Updates.reload()
          }
        })
    }

  }, [])

  return fontsLoaded
    ? (
      <>
        <StatusBar
          backgroundColor={backgroundGrey}
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          animated
        />
        <View style={{ flex: 1 }}>
          <Provider store={store}>
              <Navigation />
          </Provider>
        </View>
      </>
    ) : (
      <View style={styles.container} />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
