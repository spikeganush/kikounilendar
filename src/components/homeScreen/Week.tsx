import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOURS} from '../../constants/generalConstants';
import DayCard from './DayCard';
import {useTimeStore} from '../../store/timeStore';

interface IDayNumberByIndex {
  [key: number]: number;
}

const Week = () => {
  const weekDays = useTimeStore(state => state.weekDays);
  const date = useTimeStore(state => state.date);
  const [dayNumberByIndex, setDayNumberByIndex] = useState<number[]>([]);

  const calculateDayNumber = () => {
    const todayIs = date?.day;
    const todayNumber = weekDays.indexOf(todayIs);
    let previousDays = [];
    let nextDays = [];
    for (let i = todayNumber; i >= 0; i--) {
      previousDays[i] = parseInt(date?.dayNumber) - (todayNumber - i);
    }
    for (let i = todayNumber; i < weekDays.length; i++) {
      nextDays.push(parseInt(date?.dayNumber) + (i - todayNumber));
    }
    const dayNumberByIndex = [...previousDays, ...nextDays];
    const uniDayNumberByIndex = [...new Set(dayNumberByIndex)];
    setDayNumberByIndex(uniDayNumberByIndex);
  };

  useEffect(() => {
    calculateDayNumber();
  }, []);

  return (
    <View style={[styles['week-area']]}>
      {weekDays.map((day, index) => {
        return (
          <DayCard
            key={index}
            day={day}
            thisDayNumber={dayNumberByIndex[index]}
          />
        );
      })}
    </View>
  );
};

export default Week;

const styles = StyleSheet.create({
  'week-area': {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLOURS.WHITE,
    backgroundClip: 'padding-box',
    elevation: 5,
  },
});
