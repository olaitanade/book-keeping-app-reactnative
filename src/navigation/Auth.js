import { createStackNavigator } from 'react-navigation-stack'

import JoinHuzz from '../screens/Auth/JoinHuzz'
import SignIn from '../screens/Auth/SignIn'
import CreateBusiness from '../screens/Auth/CreateBusiness'
import CreatePin from '../screens/Auth/CreatePin'
import SignIn from '../screens/Auth/SignIn'
import ForgotPassword from '../screens/ForgotPassword'
import ResetPassword from '../screens/ResetPassword'

const navigationOptions = {
  headerShown: false,
}

const AuthNavigator = createStackNavigator({
  EnterDomain: {
    screen: EnterDomain,
    navigationOptions,
  },
  Login: {
    screen: Login,
    navigationOptions,
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions,
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions,
  },
})

export default AuthNavigator
