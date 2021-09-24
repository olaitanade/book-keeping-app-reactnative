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
  textColorSecondary,
  veryLightBlue,
} from '../config/colors'
import { BoldText } from './Text'

import HomeIcon from '../assets/icons/home-icon.svg'

const BottomTab = ({ navigation }) => {
  const links = [
    {
      text: 'Home',
      link: 'HomeStack',
      index: 0,
    },
    {
      text: 'Inventory',
      link: 'InventoryStack',
      index: 1,
    },
    {
      text: 'Invoice',
      link: 'InvoiceStack',
      index: 2,
    },
    {
      text: 'Teams',
      link: 'TeamStack',
      index: 3,
    },
    {
      text: 'More',
      link: 'MoreStack',
      index: 4,
    },
  ]

  const getIcon = (link, active) => {
    const iconStyles = {
      height: 18,
      width: 18,
      color: active ? red : textColorSecondary,
    }

    switch (link) {
      case 'HomeStack':
        return <HomeIcon {...iconStyles} />
      case 'InventoryStack':
        return <HomeIcon {...iconStyles} />
        case 'InvoiceStack':
        return <HomeIcon {...iconStyles} />
      case 'TeamStack':
        return <HomeIcon {...iconStyles} />
        case 'MoreStack':
        return <HomeIcon {...iconStyles} />
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
    color: red,
    marginLeft: 7,
  },
})

export default BottomTab
