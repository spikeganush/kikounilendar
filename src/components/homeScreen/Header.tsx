import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOURS} from '../../constants/generalConstants';
import {useTimeStore} from '../../store/timeStore';
import {commonStyles} from '../../constants/stylesConstant';

const Header = () => {
  const now = useTimeStore(state => state.now);
  const weekNumber = useTimeStore(state => state.weekNumber);

  return (
    <View style={[styles.header, styles.padding]}>
      <View style={styles['first-line']}>
        <Text style={[commonStyles.text, styles.title]}>Today is</Text>
        <Text style={commonStyles.text}>Week {weekNumber}</Text>
      </View>
      <Text style={[commonStyles.text, styles.now]}>{now}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  padding: {
    padding: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: 110,
    backgroundColor: COLOURS.LIGHT_BLUE,
    backgroundClip: 'padding-box',
    elevation: 5,
  },
  'first-line': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
  },
  now: {
    textAlign: 'center',
  },
});
