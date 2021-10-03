import React from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  borderGrey,
  red,
  blue,
  textColorSecondary,
  veryLightBlue,
} from '../config/colors'
import { BoldText } from './Text'
import { AntDesign,FontAwesome5, FontAwesome ,MaterialIcons,Feather} from '@expo/vector-icons'; 

import HomeIcon from '../assets/icons/better.svg'

const BottomTab = ({ navigation }) => {
  const links = [
    {
      text: 'Teams',
      link: 'TeamStack',
      index: 3,
    },
    {
      text: 'Inventory',
      link: 'InventoryStack',
      index: 1,
    },
    {
      text: 'Home',
      link: 'HomeStack',
      index: 0,
    },
    {
      text: 'Invoice',
      link: 'InvoiceStack',
      index: 2,
    },
    {
      text: 'More',
      link: 'MoreStack',
      index: 4,
    },
  ]

  const getIcon = (link, active) => {
    const iconStyles = {
      height: 24,
      width: 24,
      size: 24,
      color: active ? blue : textColorSecondary,
    }

    switch (link) {
      case 'HomeStack':
        return <FontAwesome5 name="store" {...iconStyles} />
      case 'InventoryStack':
        return  <FontAwesome5 name="box-open" {...iconStyles} /> 
        case 'InvoiceStack':
        return <FontAwesome5 name="file-invoice" {...iconStyles} />
      case 'TeamStack':
        return <FontAwesome name="users" {...iconStyles} />
        case 'MoreStack':
        return <AntDesign name="appstore1" {...iconStyles} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {links.map(({ index, text, link }) => {
          const active = index === navigation.state.index

          return (
            <TouchableOpacity
              key={link}
              onPress={() => navigation.navigate(link)}
              style={active ? [styles.item, styles.itemActive] : styles.item}
            >
              {getIcon(link, active)}
              {active && (
                <BoldText style={styles.textActive}>
                  {text}
                </BoldText>
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: borderGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 15,
  },
  itemActive: {
    backgroundColor: veryLightBlue,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textActive: {
    color: blue,
    marginLeft: 7,
  },
})

export default BottomTab
