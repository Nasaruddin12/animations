import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMovies } from '../api'
import StackAnimation from '../component/StackAnimation'

const SceondScreen = (props) => {
    const {movies} = props.route.params
  return (
    <View style={styles.container}>
       <StackAnimation movies={movies} />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})
export default SceondScreen