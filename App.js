import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MyTabs from './src/navigation/MyTabs';
import SceondScreen from './src/screens/SceondScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle='light-content'
            />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false,  animationEnabled: false, }}>
                    <Stack.Screen name='/firstScreen' component={MyTabs} />
                    <Stack.Screen name='/sceondScreen' component={SceondScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

