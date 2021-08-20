import { createStackNavigator } from 'react-navigation-stack'

import Onboarding from '../screens/Onboarding'

const navigationOptions = {
  headerShown: false,
}

const OnbaordingNavigator = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
    navigationOptions,
  },
})

export default OnbaordingNavigator
