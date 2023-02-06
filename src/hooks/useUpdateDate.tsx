import {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/en-au';
import {useTimeStore} from '../store/timeStore';

export const useUpdateDate = () => {
  const [localMoment, setLocalMoment] = useState(moment().locale('en-Au'));
  const date = useTimeStore(state => state.date);
  const setDate = useTimeStore(state => state.setDate);
  const hour = useTimeStore(state => state.hour);
  const setHour = useTimeStore(state => state.setHour);
  const amPm = useTimeStore(state => state.amPm);
  const setAmPm = useTimeStore(state => state.setAmPm);
  const setWeekNumber = useTimeStore(state => state.setWeekNumber);
  const setNow = useTimeStore(state => state.setNow);

  const updateDate = () => {
    setLocalMoment(moment().locale('en-Au'));
  };

  useEffect(() => {
    setInterval(() => {
      updateDate();
    }, 1000 * 60);
    setWeekNumber(moment().week());
  }, []);

  useEffect(() => {
    const [hour, amPm] = localMoment.format('LT').split(' ');
    setHour(hour);
    setAmPm(amPm);
  }, [localMoment]);

  useEffect(() => {
    const [day, dayNumber, month, year] = localMoment.format('LLLL').split(' ');
    setDate({day: day.split(',')[0], dayNumber, month, year});
  }, [amPm]);

  useEffect(() => {
    setNow(
      `${date?.day} ${date?.dayNumber} ${date?.month} ${date?.year} ${hour} ${amPm}`,
    );
  }, [hour]);

  return {updateDate};
};
