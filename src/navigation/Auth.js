import { createStackNavigator } from 'react-navigation-stack'

import JoinHuzz from '../screens/Auth/JoinHuzz'
import SignIn from '../screens/Auth/SignIn'
import CreateBusiness from '../screens/Auth/CreateBusiness'
import CreatePin from '../screens/Auth/CreatePin'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import ResetPassword from '../screens/Auth/ResetPassword'

const navigationOptions = {
  headerShown: false,
}

const AuthNavigator = createStackNavigator({
  JoinHuzz: {
    screen: JoinHuzz,
    navigationOptions,
  },
  SignIn: {
    screen: SignIn,
    navigationOptions,
  },
  CreateBusiness: {
    screen: CreateBusiness,
    navigationOptions,
  },
  CreatePin: {
    screen: CreatePin,
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
