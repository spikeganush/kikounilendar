import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../components/homeScreen/Header';
import Week from '../components/homeScreen/Week';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Week />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
