import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import HomeIcon from '../assets/icons/home-icon.svg'
import Home from '../screens/Main/Home'
import Inventory from '../screens/Main/Inventory'


const BottomTabNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <HomeIcon name="home" size={25} color={tintColor} />
          )
        }
      },
      Inventory: {
        screen: Inventory,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <HomeIcon name="inventory" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: '#eb6e3d'
      }
    }
  );

export default BottomTabNavigator
