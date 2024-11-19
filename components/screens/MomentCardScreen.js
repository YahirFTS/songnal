import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MomentCardScreen = ({ suggestion, onRefresh }) => {
 

  return (
    <View style={styles.card}>
      <Text style={styles.suggestionText}>{suggestion}</Text>
      <TouchableOpacity onPress={onRefresh}>
        <Text style={styles.refreshText}>⟲</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    maxWidth: 300, // Establecemos un tamaño máximo
    minHeight: 50,
    right: 20,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 16,
    flex:1,
  },
  refreshText: {
    color: '#fff',
    fontSize: 36,
    
    
  },
});

export default MomentCardScreen;
