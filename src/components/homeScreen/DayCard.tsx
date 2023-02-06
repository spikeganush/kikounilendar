import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOURS} from '../../constants/generalConstants';
import {commonStyles} from '../../constants/stylesConstant';
import {useTimeStore} from '../../store/timeStore';

interface IDayCardProps {
  day: string;
  thisDayNumber: number;
}

const DayCard = (props: IDayCardProps) => {
  const {day, thisDayNumber} = props;
  const date = useTimeStore(state => state.date);

  return (
    <View style={[styles['day-card'], day === 'Sunday' && styles.sunday]}>
      <View
        style={[styles['day-card__header'], day === date?.day && styles.today]}>
        <Text style={commonStyles.text}>
          {day} {thisDayNumber}
        </Text>
      </View>
    </View>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  'day-card': {
    borderColor: COLOURS.LIGHT_GREY,
    borderWidth: 1,
    width: '33.33%',
    height: '33.33%',
  },
  sunday: {
    width: '100%',
  },
  'day-card__header': {
    height: '25%',
    backgroundColor: COLOURS.HEADER_WEEK_BACKGROUND,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    backgroundColor: COLOURS.LIGHT_PINK,
  },
});
