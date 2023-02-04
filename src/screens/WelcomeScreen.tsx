import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WelcomeScreen = () => {
  return (
    <View>
      <Text style={styles.welcomeText}>WelcomeScreen</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 30,
    color: 'red',
  },
});
