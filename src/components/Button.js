import React from 'react'
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native'

import { backgroundGrey, blue, green, red, crimson, white } from '../config/colors'
import Text, { BoldText } from './Text'
import { AntDesign } from '@expo/vector-icons'

const Button = ({
  title = '',
  onPress = () => null,
  style = {},
  textStyle = {},
  loading = false,
  disabled = false,
  backgroundColor = blue,
  color = '#fff',
  rounded = false,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 40,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: rounded ? 100 : 8,
        width: '100%',
        opacity: disabled ? .3 : 1,
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled || loading}
      {...props}
    >
      {loading
        ? (
          <ActivityIndicator
            size="small"
            animating
            color={color}
          />
        ) : children ?? (
          <Text
            style={{
              color,
              fontSize: 15,
              textAlign: 'center',
              ...textStyle,
            }}
          >
            {title}
          </Text>
        )}
    </TouchableOpacity>
  )
}

export const TransactionButton = ({
  moneyIn = false,
}) => {
  return (
    <Button style={{width:'45%', height:65, marginHorizontal: 10}} backgroundColor={moneyIn ? green : red}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems:'center'}}>
            {
              moneyIn?
                <AntDesign name="pluscircleo" size={15} color={white} />
              :
                <AntDesign name="minuscircleo" size={15} color={white} />
            }
          
          <BoldText style={{color:white, fontSize:17, marginHorizontal:5}}> {moneyIn ? 'Money In' : 'Money Out'}</BoldText>
          </View>
          <Text style={{color:white,fontSize:11}}>{moneyIn ? 'Click here to record income' : 'Click here to record expense'}</Text>
        </View>
    </Button>
  )
}

export const ImageButton = ({
  onPress = () => null,
  style = {},
  disabled = false,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        margin:5,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

export const FAB = ({
  onPress = () => null,
  style = {},
  disabled = false,
  backgroundColor = blue,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor,
        elevation: 2,
        shadowColor: '#00000055',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        height: 60,
        width: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Button
