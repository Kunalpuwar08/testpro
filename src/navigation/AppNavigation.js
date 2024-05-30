import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screens/Auth/Auth';
import Home from '../screens/Home/Home';
import Signup from '../screens/Auth/Signup';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Auth' component={Auth} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}

export default AppNavigation