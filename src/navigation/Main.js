import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BottomTab from '../components/BottomTab'
import Home from '../screens/Main/Home'
import Inventory from '../screens/Main/Inventory'
import Invoice from '../screens/Main/Invoice';
import More from '../screens/Main/More';
import Teams from '../screens/Main/Teams';

const navigationOptions = {
  headerShown: false,
}

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions,
  }
}, {
  navigationOptions,
})

const InventoryStack = createStackNavigator({
  Inventory: {
    screen: Inventory,
    navigationOptions,
  }
}, {
  navigationOptions,
})

const InvoiceStack = createStackNavigator({
  Invoice: {
    screen: Invoice,
    navigationOptions,
  }
}, {
  navigationOptions,
})

const TeamStack = createStackNavigator({
  Teams: {
    screen: Teams,
    navigationOptions,
  }
}, {
  navigationOptions,
})

const MoreStack = createStackNavigator({
  More: {
    screen: More,
    navigationOptions,
  }
}, {
  navigationOptions,
})

const BottomTabNavigator = createBottomTabNavigator(
    {
      HomeStack,
      InventoryStack,
      InvoiceStack,
      TeamStack,
      MoreStack
    }, {
      initialRouteName: 'HomeStack',
      tabBarComponent: (props) => <BottomTab {...props} />,
      animationEnabled: false,
      lazy: true,
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
        },
      }),
    }
  );

export default BottomTabNavigator
