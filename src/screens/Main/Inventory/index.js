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

const Inventory = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView style={styles.content}>
          
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

export default Inventory