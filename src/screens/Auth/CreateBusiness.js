import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import {
  backgroundGrey,
  blue,
  textSecondary,
} from '../../config/colors'
import Text, { VeryBoldText, BoldText } from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'
//import { setAuthToken } from '../../helpers/token'
import { showApiError } from '../../helpers/api'
import BackIcon from '../../assets/icons/back-icon.svg'

const CreateBusiness = ({ navigation }) => {
  const domain = navigation.getParam('domain', null)

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const handleInput = (value) => {
    setUser({
      ...user,
      ...value,
    })
  }

  const [login, { loading, client }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      showApiError(error?.message)
    },
  })

  const handleLogin = async () => {
    try {
      const { username: email, password } = user
      const { data, errors } = await login({ variables: { email, password, institutionId: domain?.value } })

      if (data) {
        const { login: { token, user: userData } } = data

        console.log('login', userData)
        if (userData?.roles?.includes('STUDENT')) {
          //setAuthToken(token)
          client.writeQuery({
            query: LOGGED_IN_USER_QUERY,
            data: { loggedInUser: userData },
          })

          navigation.navigate('Main')
        } else {
          showApiError('You don\'t have access to this platform')
        }
      } else {
        console.log({ errors })
      }
    } catch (error) {
      showApiError(error?.message, true, handleLogin)
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView style={styles.content}>
          <SafeAreaView style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 20 }}
            >
              <BackIcon color={textSecondary} />
            </TouchableOpacity>
            <View style={styles.header}>
              <VeryBoldText style={styles.logoText}>DSLMS</VeryBoldText>
              <BoldText style={styles.title}>
                Online learning
                {'\n'}
                platform
              </BoldText>
            </View>
          </SafeAreaView>
          <View style={styles.body}>
            <BoldText style={styles.formTitle}>Log in</BoldText>
            <Input
              label="Username"
              placeholder="ID or Email address"
              value={user.username}
              onChangeText={(username) => handleInput({ username })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Password"
              placeholder="********"
              value={user.password}
              onChangeText={(password) => handleInput({ password })}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text style={{ color: blue }}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              loading={loading}
              onPress={handleLogin}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
                <MaterialIcons
                  name="arrow-right-alt"
                  size={22}
                  color="#fff"
                />
              </View>
            </Button>
            <Text style={styles.privacyText}>
              By clicking Sign in, you agree to our
              {' '}
              <Text style={{ color: blue }}>Terms of use</Text>
              {' '}
              and our
              {' '}
              <Text style={{ color: blue }}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    // flex: 1,
  },
  headerContainer: {
    backgroundColor: backgroundGrey,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  logoText: {
    color: blue,
    fontSize: 22,
  },
  title: {
    marginVertical: 20,
    fontSize: 22,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: -32,
  },
  formTitle: {
    fontSize: 22,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginRight: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  privacyText: {
    color: textSecondary,
    marginTop: 20,
  },
})

export default CreateBusiness