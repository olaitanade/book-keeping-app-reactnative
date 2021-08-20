import React from 'react'
import { View, StyleSheet } from 'react-native'

import Text from './Text'
import { textSecondary } from '../config/colors'

const EmptyState = ({
  text = '',
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={{ ...styles.text, ...textStyle }}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    color: textSecondary,
  },
})

export default EmptyState
