import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { height } from '../utils'
import Feather from 'react-native-vector-icons/Feather'

const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={(e) => props.onChangeText(e)}
                style={styles.inputStyle}
            />
            <Feather name='search' color='#fff' size={30} style={styles.iconStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%'
    },
    inputStyle:{
        height:43,
        backgroundColor: '#a99ad2',
        borderRadius: 20,
        paddingLeft:60
    },
    iconStyle:{
        position:'absolute',
        left:13,
        top:6
    }
})

export default SearchBar