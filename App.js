import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen.js';
import EntryScreen from './components/screens/EntryScreen.js';
import * as React from 'react';
import SelectSongScreen from './components/screens/SelectSongScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="SelectSong" component={SelectSongScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
