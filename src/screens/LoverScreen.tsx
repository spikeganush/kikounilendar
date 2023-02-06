import {StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../components/homeScreen/Header';
import Week from '../components/homeScreen/Week';

const LoverScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Week />
    </View>
  );
};

export default LoverScreen;

const styles = StyleSheet.create({
  padding: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
});
