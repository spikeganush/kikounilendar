import {StyleSheet} from 'react-native';
import {sizeBasedOnScreenWidth} from '../utils/generalUtilities';
import {COLOURS} from './generalConstants';

export const commonStyles = StyleSheet.create({
  padding: {
    padding: 20,
  },
  text: {
    color: COLOURS.BLACK,
    fontSize: sizeBasedOnScreenWidth(15.625),
    fontWeight: 'bold',
  },
});
