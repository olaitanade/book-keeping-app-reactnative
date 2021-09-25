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
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons'

import {
  white,
  backgroundGrey,
  red,
  blue,
  textSecondary,
} from '../../../config/colors'
import Text, { VeryBoldText, BoldText } from '../../../components/Text'
import Input, {Picker} from '../../../components/Input'
import Button, {ImageButton, FAB} from '../../../components/Button'
import Header from '../../../components/Header'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio'

const Home = ({ navigation }) => {
  const demoBusiness = [
    { label: 'Shoe Store', value: 1 },
  ]
  const [business, setBusiness] = useState(demoBusiness[0])
  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
              <Picker
              coverStyle={styles.businessPicker}
              placeholder="Select Business"
              value={business}
              onSelect={(val) => {
                setBusiness(val)
              }}
              items={demoBusiness}
              />
              <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                <ImageButton >
                  <Ionicons name="notifications-outline" size={24} color="black" />
                </ImageButton>
                
                <ImageButton >
                  <Feather name="settings" size={24} color="black" />
                </ImageButton>
              </View>
              
            </View>
          </SafeAreaView>
        <ScrollView style={styles.content}>
          <View style={styles.reportCard}>
              <Text style={{color: white}}>Today's Balance</Text>
              <VeryBoldText style={{color: white, fontSize: 28}}>N100,000</VeryBoldText>
              <View style={{flexDirection: 'row', margin:7}}>
                <Text style={{color: white}}>Total Balance: </Text>
                <VeryBoldText style={{color: white}}>N100,000</VeryBoldText>
              </View>
              <TouchableOpacity style={{flexDirection:'row', padding: 5, alignItems: 'center', borderWidth: 1, borderColor: white, borderRadius:10}}>
                <VeryBoldText style={{fontSize: 16, color:white, margin: 5}}>SEE ALL YOUR RECORDS</VeryBoldText>
                <FontAwesome name="caret-right" size={20} color={white} />
              
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{flexDirection:'row', marginHorizontal: 19, padding: 10}}>
              <View style={{flexDirection:'row', alignItems: 'center',flex:1}}>
                <FontAwesome name="user-times" size={19} color={red} />
                <VeryBoldText style={{marginHorizontal: 10, fontSize: 16}}>Debtors</VeryBoldText>
              </View>
              <View style={{flexDirection:'row',alignItems: 'center', justifyContent: 'flex-end',flex:1}}>
                <VeryBoldText style={{marginHorizontal: 10, fontSize: 16, color: red}}>N1,000</VeryBoldText>
                <FontAwesome name="caret-right" size={20} color={red} />
              </View>
          </TouchableOpacity>
          <View style={styles.body}>
            <FontAwesome name="minus" style={{alignSelf: 'center'}} size={24} color="black" />
            <VeryBoldText style={{marginHorizontal: 10, marginTop: 50, fontSize: 16,alignSelf: 'center'}}>Record A Transaction</VeryBoldText>
            <Text style={{marginHorizontal: 10, alignSelf: 'center'}}>Your transaction will display here when you add them.</Text>
          </View>
        </ScrollView>
        <FAB style={{width: 150, height: 50}}>
          <Text style={{marginHorizontal: 10, alignSelf: 'center', color: white}}>
            + Add Transaction
          </Text>
        </FAB>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGrey,
  },
  content: {
    // flex: 1,
  },
  businessPicker: {
    width: '40%',
  },
  headerContainer: {
  },
  reportCard: {
    backgroundColor: blue, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    color: white
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
    flex: 2,
    height: 200,
    paddingHorizontal: 20,
    marginTop: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
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

export default Home