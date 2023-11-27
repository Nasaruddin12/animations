import { View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const MenuBar = (props) => {
  return (
    <View>
      <FontAwesome5 name='grip-lines' color={props.color} size={props.size} onPress={props.onPress} style={props.style} />
    </View>
  )
}

export default MenuBar