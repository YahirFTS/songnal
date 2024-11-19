import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/screens/HomeScreen.js';
import EntryScreen from './components/screens/EntryScreen.js';
import * as React from 'react';
import SelectSongScreen from './components/screens/SelectSongScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const[notes, setNotes] = React.useState();
  async function fetchData(){
    const response = await fetch("http://localhost:8080/notes/1");
    const data = await response.json();
    setNotes(data);
  }


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
