import React from 'react'
import { Text as NativeText } from 'react-native'

import { textPrimary as color } from '../config/colors'

const fontSize = 14
const styles = {
  fontSize,
  color,
}

const Text = ({ style = {}, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'UbuntuRegular',
        lineHeight: (style?.fontSize ?? fontSize) * 1.5,
        ...styles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export default Text

export const BoldText = ({ style = {}, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'UbuntuMedium',
        lineHeight: (style?.fontSize ?? fontSize) * 1.5,
        ...styles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export const VeryBoldText = ({ style = {}, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'UbuntuBold',
        lineHeight: (style?.fontSize ?? fontSize) * 1.5,
        ...styles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}

export const LightText = ({ style = {}, children, ...props }) => {
  return (
    <NativeText
      style={{
        fontFamily: 'UbuntuLight',
        lineHeight: (style?.fontSize ?? fontSize) * 1.5,
        ...styles,
        ...style,
      }}
      {...props}
    >
      {children}
    </NativeText>
  )
}
