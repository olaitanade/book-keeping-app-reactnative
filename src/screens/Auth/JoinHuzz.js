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
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

import {
  backgroundGrey,
  blue,
  textSecondary,
} from '../../config/colors'
import Text, { VeryBoldText, BoldText } from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Header from '../../components/Header'
//import { setAuthToken } from '../../helpers/token'
import { showApiError } from '../../helpers/api'
import BackIcon from '../../assets/icons/back-icon.svg'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'

const JoinHuzz = ({ navigation }) => {

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

  const handleLogin = async () => {
    navigation.navigate('OTP')
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Header  title='Join Huzz' progress={0.3}/>
        <ScrollView style={styles.content}>
          <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
              <Ionicons name="ios-information-circle-sharp" size={24} color="black" />
              <Text style={ styles.headerText }>
                To verify your identity, we'll send a verification code to both your phone number {'&'} the email you entered.
              </Text>
            </View>
          </SafeAreaView>
          <View style={styles.body}>
            <Input
              label="Phone Number"
              placeholder="80 0000 00000"
              value={user.username}
              onChangeText={(username) => handleInput({ username })}
              keyboardType="numeric"
              autoCapitalize="none"
              showCountryCode
            />
            <Input
              label="Email(Optional)"
              placeholder="eg mymail@mail.com"
              value={user.username}
              onChangeText={(username) => handleInput({ username })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button
              //loading={loading}
              onPress={handleLogin}
              style={{marginTop:30,padding:25}}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
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
    flexDirection: 'row',
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  headerText: {
    padding: 20,
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
    marginTop: -10,
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
    marginTop: 30,
  },
})

export default JoinHuzz