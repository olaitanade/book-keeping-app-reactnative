import React, {
  useState,
  useRef,
  forwardRef,
} from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal'

import Text from './Text'
import {
  textPrimary,
  textSecondary,
  borderGrey,
  blue,
  backgroundGrey,
} from '../config/colors'
import CalenderIcon from '../assets/icons/calendar-icon.svg'

export default ({
  value,
  onChangeText,
  placeholder = '',
  label = '',
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  coverStyle = {},
  RightIcon = null,
  LeftIcon = null,
  multiline = false,
  style = {},
  editable = true,
  showLabel = true,
  showCountryCode = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setFocused] = useState(false)

  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: isFocused ? blue : borderGrey,
        width: '100%',
        height: multiline ? 200 : 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: multiline ? 10 : 0,
        position: 'relative',
        backgroundColor: 'transparent',
        // backgroundColor: editable ? 'transparent' : veryLightGrey,
        ...coverStyle,
      }}
    >
      {(label || (value !== '' && placeholder !== '')) && showLabel && (
        <Text
          style={{
            position: 'absolute',
            left: 5,
            top: -12,
            backgroundColor: '#fff',
            paddingHorizontal: 5,
            color: isFocused ? blue : 'rgba(0, 0, 0, .6)',
          }}
        >
          {label || placeholder}
        </Text>
      )}
      {LeftIcon && (
        <View style={{ marginRight: 10 }}>
          <LeftIcon />
        </View>
      )}
      {showCountryCode==true ? 
      (
        <PhoneInput
        style={{
          color: textSecondary,
          flex: 1,
          height: '100%',
          fontFamily: 'UbuntuRegular',
          textAlignVertical: multiline ? 'top' : 'center',
          ...style,
        }}
        initialCountry={'ng'}
        textProps={{
            placeholder: 'Enter a phone number...'
        }}
        />
      ) 
      : 
      (
        <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={textSecondary}
        autoCapitalize={secureTextEntry ? 'none' : autoCapitalize}
        secureTextEntry={secureTextEntry && !showPassword}
        multiline={multiline}
        editable={editable}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          color: textSecondary,
          flex: 1,
          height: '100%',
          fontFamily: 'UbuntuRegular',
          textAlignVertical: multiline ? 'top' : 'center',
          ...style,
        }}
        {...props}
      />
      )
      }
     {secureTextEntry
        ? (
          <TouchableOpacity
            onPress={() => setShowPassword(() => !showPassword)}
            style={{ marginLeft: 10 }}
          >
            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        ) : RightIcon && (
          <View style={{ marginLeft: 10 }}>
            <RightIcon />
          </View>
        )}
    </View>
  )
}



export const Picker = ({
  value,
  onSelect,
  placeholder = '',
  coverStyle = {},
  LeftIcon = null,
  style = {},
  items = [],
  itemStyle = {},
  hasSearch = true,
  showLabel = true,
  hasBorder = true,
}) => {
  const bottomSheet = useRef()
  const [search, setSearch] = useState('')

  return (
    <>
      <TouchableOpacity
        onPress={() => bottomSheet.current?.open?.()}
        style={{
          borderRadius: 8,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: borderGrey,
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 10,
          position: 'relative',
          ...coverStyle,
        }}
      >
        {(!!value && showLabel) && (
          <Text
            style={{
              position: 'absolute',
              left: 5,
              top: -12,
              backgroundColor: '#fff',
              paddingHorizontal: 5,
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            {placeholder}
          </Text>
        )}
        {LeftIcon && <LeftIcon />}
        <View
          style={{
            marginRight: 10,
            flex: 1,
            height: 60,
            alignItems: 'flex-start',
            justifyContent: 'center',
            ...style,
          }}
        >
          <Text
            style={{ color: value ? textPrimary : textSecondary }}
            numberOfLines={1}
          >
            {value ? value?.label : placeholder}
          </Text>
        </View>
        <Ionicons
          name="caret-down"
          size={18}
          color={textSecondary}
        />
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheet}
        height={Dimensions.get('window').height * 0.65}
        duration={500}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          draggableIcon: {
            width: 50,
            height: 5,
            borderRadius: 100,
            backgroundColor: borderGrey,
          },
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {hasSearch && (
              <View style={{ paddingHorizontal: 20 }}>
                <SearchInput
                  placeholder="Search"
                  value={search}
                  onChangeText={(val) => setSearch(val)}
                />
              </View>
            )}
            <ScrollView style={{ padding: 20 }}>
              {items
                .filter((item) => item.label?.toLowerCase()?.includes(search?.toLowerCase()))
                .map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        bottomSheet.current?.close?.()
                        onSelect(item)
                      }}
                      key={item.value}
                      style={{
                        paddingVertical: 10,
                        ...itemStyle,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: value?.value === item.value ? blue : textPrimary }}>{item.label}</Text>
                    </TouchableOpacity>
                  )
                })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </RBSheet>
    </>
  )
}

export const SearchInput = forwardRef(({
  value,
  onChangeText,
  placeholder = '',
  coverStyle = {},
  style = {},
  ...props
}, ref) => {
  return (
    <View
      style={{
        borderRadius: 8,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 0,
        backgroundColor: backgroundGrey,
        ...coverStyle,
      }}
    >
      <View style={{ marginRight: 10 }}>
        <Ionicons
          color={textSecondary}
          size={16}
          name="ios-search"
        />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={textSecondary}
        ref={ref}
        clearButtonMode="while-editing"
        style={{
          color: textSecondary,
          flex: 1,
          height: '100%',
          fontFamily: 'UbuntuRegular',
          ...style,
        }}
        {...props}
      />
    </View>
  )
})

export const DatePicker = ({
  value,
  onSetDate,
  placeholder = '',
  coverStyle = {},
  LeftIcon = null,
  style = {},
  showLabel = true,
  maximumDate = null,
}) => {
  const [selectDate, setSelectDate] = useState(false)

  return (
    <>
      <TouchableOpacity
        onPress={() => setSelectDate(true)}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: borderGrey,
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingHorizontal: 10,
          position: 'relative',
          ...coverStyle,
        }}
      >
        {(!!value && showLabel) && (
          <Text
            style={{
              position: 'absolute',
              left: 5,
              top: -12,
              backgroundColor: '#fff',
              paddingHorizontal: 5,
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            {placeholder}
          </Text>
        )}
        {LeftIcon && <LeftIcon />}
        <View
          style={{
            marginRight: 10,
            flex: 1,
            height: 60,
            alignItems: 'flex-start',
            justifyContent: 'center',
            ...style,
          }}
        >
          <Text
            style={{ color: value ? textPrimary : textSecondary }}
            numberOfLines={1}
          >
            {value ? moment(new Date(value)).format('D MMMM, YYYY') : placeholder}
          </Text>
        </View>
        <CalenderIcon
          color={textSecondary}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={selectDate}
        mode="date"
        onConfirm={(date) => {
          onSetDate(date)
          setSelectDate(false)
        }}
        onCancel={() => setSelectDate(false)}
        textColor={textPrimary}
        isDarkModeEnabled={false}
        date={new Date(value) ?? new Date()}
        maximumDate={maximumDate}
      />
    </>
  )
}
