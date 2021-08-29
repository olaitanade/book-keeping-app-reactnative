import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { textPrimary, textSecondary, blue } from '../config/colors'
import { BoldText } from './Text'

import NotificationsIcon from '../assets/icons/notifications-icon.svg'
import BackIcon from '../assets/icons/back-icon.svg'
import CloseIcon from '../assets/icons/close-icon.svg'
import * as Progress from 'react-native-progress'

const Header = ({
  navigation,
  back = false,
  close = false,
  onBackPress = null,
  hasSearch = false,
  hasShadow = false,
  noRight = false,
  title = '',
  textStyle = {},
  textColor = textPrimary,
  iconColor = textSecondary,
  searchPlaceholder = 'Search LMS',
  backgroundColor = '#fff',
  RightIcon = null,
  progress = 0
}) => {
  return (
    <SafeAreaView
      style={hasShadow
        ? { ...styles.container, ...styles.withShadow, backgroundColor }
        : { ...styles.container, backgroundColor }}
    >
      <View style={{ ...styles.content, backgroundColor }}>
        {(back || close) && (
          <TouchableOpacity onPress={() => (onBackPress ? onBackPress?.() : navigation.goBack())}>
            {back
              ? <BackIcon color={iconColor} />
              : (
                <CloseIcon
                  color={iconColor}
                  height={26}
                  width={26}
                />
              )}
          </TouchableOpacity>
        )}
        <View style={{ ...styles.body, paddingLeft: back || close ? 15 : 0 }}>
          {hasSearch
            ? (
              null
            ) : (
              <BoldText
                style={{
                  ...styles.title,
                  color: textColor,
                  ...textStyle,
                }}
                numberOfLines={1}
              >
                {title}
              </BoldText>
            )}
        </View>
        {!noRight
          ? RightIcon ?? (
            <TouchableOpacity>
               <BoldText 
               style={{
                ...styles.title,
                color: blue,
                ...textStyle,
              }}
              numberOfLines={1}
               >
                 Sign in
               </BoldText>
            </TouchableOpacity>
          ) : null}
      </View>
      {progress!==0?
        <Progress.Bar progress={progress} width={null} />
      :
      null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  withShadow: {
    elevation: 2,
    shadowColor: '#00000055',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    width: '100%',
  },
})

export default withNavigation(Header)
