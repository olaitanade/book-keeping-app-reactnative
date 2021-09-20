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
} from '../../../config/colors'
import Text, { VeryBoldText, BoldText } from '../../../components/Text'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
//import { setAuthToken } from '../../helpers/token'
import { showApiError } from '../../../helpers/api'
import BackIcon from '../../assets/icons/back-icon.svg'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const Teams = ({ navigation }) => {
  const [otp, setOTP] = useState("")
  const pinInput = React.createRef();

  const _checkCode = (code) => {
    if (code != '1234') {
      pinInput.current.shake()
        .then(() => setOTP(""));
    }
  }
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
    navigation.navigate('CreateBusiness')
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Header back noRight  title='Create Business' progress={0.7}/>
        <ScrollView style={styles.content}>
          <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
              <Ionicons name="ios-information-circle-sharp" size={24} color="black" />
              <Text style={ styles.headerText }>
                Profile Setup
              </Text>
            </View>
          </SafeAreaView>
          <View style={styles.body}>
            <Input
              label="First name"
              placeholder="Adetayo"
              value={user.username}
              onChangeText={(username) => handleInput({ username })}
              keyboardType="default"
              autoCapitalize="none"
            />
            <Input
              label="Last name"
              placeholder="Olaitan"
              value={user.username}
              onChangeText={(username) => handleInput({ username })}
              keyboardType="default"
              autoCapitalize="none"
            />

            <View style={styles.otp}>
            <Text style={styles.title}>Enter Pin</Text>
              <SmoothPinCodeInput
                password mask="﹡"
                ref={pinInput}
                value={otp}
                onTextChange={code => setOTP(code)}
                onFulfill={_checkCode}
                onBackspace={() => console.log('No more back.')}
                />
                <Text style={styles.title}>Confirm Pin</Text>
                <SmoothPinCodeInput
                password mask="﹡"
                ref={pinInput}
                value={otp}
                onTextChange={code => setOTP(code)}
                onFulfill={_checkCode}
                onBackspace={() => console.log('No more back.')}
                />
            </View>

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
  otp: {
    
  },
})

export default Teams