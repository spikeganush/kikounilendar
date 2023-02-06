import {create} from 'zustand';
import {IDateParsed} from '../typings/generalTypings';

interface ITimeStore {
  date: IDateParsed;
  hour: string;
  amPm: string;
  now: string;
  weekNumber: number;
  weekDays: string[];
  setDate: (date: IDateParsed) => void;
  setHour: (hour: string) => void;
  setAmPm: (amPm: string) => void;
  setNow: (now: string) => void;
  setWeekNumber: (weekNumber: number) => void;
}

const timeStore = (set: any, get: any) => ({
  date: {
    day: '',
    dayNumber: '',
    month: '',
    year: '',
  },
  hour: '',
  amPm: '',
  now: '',
  weekNumber: 0,
  weekDays: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  setDate: (date: IDateParsed) => set({date}),
  setHour: (hour: string) => set({hour}),
  setAmPm: (amPm: string) => set({amPm}),
  setNow: (now: string) => set({now}),
  setWeekNumber: (weekNumber: number) => set({weekNumber}),
});

export const useTimeStore = create<ITimeStore>(timeStore);
