import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';


import MomentCardScreen from './MomentCardScreen';
import SelectSongScreen from './SelectSongScreen';

const EntryScreen = ({ navigation }) => {
  const [suggestion, setSuggestion] = useState('Write about the song you were listening this morning');

  const suggestions = [
    'Write about the song you were listening this morning',
    'Lorem ipsum',
    'Describe how a song made you feel today',
    // Añade más sugerencias aquí
  ];

  const handleRefresh = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    setSuggestion(suggestions[randomIndex]);
  };

  return (
    <LinearGradient style={styles.container} colors={["#343131", "#343131"]}>
      <TouchableOpacity onPress={() => navigation.navigate("SelectSong")}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Write new entry</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.selectMoment}>Select a moment</Text>
      </View>
      <MomentCardScreen suggestion={suggestion} onRefresh={handleRefresh} />
    </LinearGradient>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambié esto a flex-start para alinear los elementos al principio
    padding: 20, // Añadí padding para un mejor espaciado
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3DFFF',
    borderRadius: 20,
    width: 180,
    height: 50,
  },
  selectMoment: {
    justifyContent: 'space-between',
    fontSize: 20,
    color: 'white',
    marginTop: 50,
    right: 90,
  }
});
