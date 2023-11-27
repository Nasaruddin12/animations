import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import { height, width } from '../utils';
import LinearGradient from 'react-native-linear-gradient';

function Setting() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#8f83c3', '#8f83c3', '#a9c9ba', '#a9c9ba']} style={styles.linearGradient}>

        <Text>Setting!</Text>
      </LinearGradient>
    </View>
  );
}

function Share() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#8f83c3', '#8f83c3', '#a9c9ba', '#a9c9ba']} style={styles.linearGradient}>

        <Text>Share!</Text>
      </LinearGradient>
    </View>
  );
}

function Like() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#8f83c3', '#8f83c3', '#a9c9ba', '#a9c9ba']} style={styles.linearGradient}>

        <Text>Like!</Text>
      </LinearGradient>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarShowLabel: false,
        headerShown: false,
        animationEnabled: false,
        tabBarStyle: {
          backgroundColor: '#a9c9ba',
          height: width * 0.18
        },
        tabBarInactiveTintColor: '#4D4D4D'
      }}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={33} />
          ),
        }}
      />
      <Tab.Screen
        name="Share"
        component={Share}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <Feather name="share-2" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default MyTabs;