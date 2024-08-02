import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as React from 'react';

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient style={styles.container} colors={["#133A94", "#919BFF"]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Song-it</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Entry")}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textContainer: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: 'grey',
  },
  addText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
