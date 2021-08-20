import React, { useState } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import { MaterialIcons } from '@expo/vector-icons'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import { blue, textPrimary, textSecondary } from '../../config/colors'
import Text, { BoldText } from '../../components/Text'
import Button from '../../components/Button'

import Walkthrough1Icon from '../../assets/icons/walkthrough-icon-1.svg'
import Walkthrough2Icon from '../../assets/icons/walkthrough-icon-2.svg'
import Walkthrough3Icon from '../../assets/icons/walkthrough-icon-3.svg'

const FirstTab = () => {
  return (
    <View style={styles.tab}>
      <Walkthrough1Icon />
      <BoldText style={styles.title}>Learn from experts</BoldText>
      <Text style={styles.description}>
        Build skills from top instructors from leading universities and industries
      </Text>
    </View>
  )
}

const SecondTab = () => {
  return (
    <View style={styles.tab}>
      <Walkthrough2Icon />
      <BoldText style={styles.title}>Pursue any goal</BoldText>
      <Text style={styles.description}>
        Master job-relevant skills and earn career credentials
      </Text>
    </View>
  )
}

const ThirdTab = () => {
  return (
    <View style={styles.tab}>
      <Walkthrough3Icon />
      <BoldText style={styles.title}>Start today</BoldText>
      <Text style={styles.description}>
        Choose from hundreds of free courses. Master job-relevant skills and earn career credentials. Choose from hundreds of free courses
      </Text>
    </View>
  )
}

const Onboarding = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ])

  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
    third: ThirdTab,
  })

  const gotoLogin = () => {
    AsyncStorage.setItem('onboarded', 'true')
    navigation.navigate('EnterDomain')
  }

  const changeIndex = (increment) => {
    const newIndex = index + increment
    setIndex(() => newIndex)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          {index > 0
            ? (
              <TouchableOpacity onPress={() => changeIndex(-1)}>
                <MaterialIcons
                  name="keyboard-backspace"
                  size={22}
                  color={textPrimary}
                />
              </TouchableOpacity>
            ) : <View />}
          {index < 2 && (
            <TouchableOpacity onPress={gotoLogin}>
              <Text style={styles.description}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={() => null}
            // swipeEnabled={false}
          />
        </View>
        <View style={styles.footer}>
          {index < 2
            ? (
              <AnimatedCircularProgress
                size={70}
                width={1}
                fill={(index + 1) * 33.33}
                tintColor={blue}
                backgroundColor="#fff"
                lineCap="round"
                duration={300}
                rotation={360}
              >
                {
                  () => (
                    <View style={styles.fabContainer}>
                      <TouchableOpacity
                        onPress={() => changeIndex(1)}
                        style={styles.fab}
                      >
                        <MaterialIcons
                          name="arrow-right-alt"
                          size={22}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }
              </AnimatedCircularProgress>
            ) : (
              <Button onPress={gotoLogin}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Get Started</Text>
                  <MaterialIcons
                    name="arrow-right-alt"
                    size={22}
                    color="#fff"
                  />
                </View>
              </Button>
            )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 25,
  },
  description: {
    color: textSecondary,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  fabContainer: {
    flex: 1,
    padding: 7,
  },
  fab: {
    height: 55,
    width: 55,
    borderRadius: 35,
    backgroundColor: blue,
    alignItems: 'center',
    justifyContent: 'center',
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
})

export default Onboarding
