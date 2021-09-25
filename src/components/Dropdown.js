import React from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { red, textColor } from '../config/colors'
import Text from './Text'

const Dropdown = ({
  visible,
  setVisible,
  items = [],
  layout,
  coverTrigger = true,
  offsetTop = 0,
  backgroundColor = 'transparent',
}) => {
  const {
    x,
    height,
    y,
    width,
  } = layout

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
    >
      <TouchableOpacity
        style={{ ...styles.modalContainer, backgroundColor }}
        onPress={() => setVisible(false)}
      >
        <View
          style={{
            ...styles.modal,
            marginTop: coverTrigger ? y : y + height + offsetTop,
            marginLeft: x - 150 + width,
          }}
        >
          {items.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                item.onPress?.()
                setVisible(false)
              }}
              style={styles.dropdownItem}
            >
              <Text style={{ ...styles.dropdownItemText, color: item.active ? red : textColor }}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modal: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    elevation: 1,
    shadowRadius: 8,
    shadowColor: 'rgba(39, 40, 51, 0.25)',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.5,
  },
  dropdownItem: {
    marginVertical: 5,
    elevation: 1,
  },
  dropdownItemText: {
    fontSize: 16,
  },
})

export default Dropdown
