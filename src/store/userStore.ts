import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {IUser} from '../typings/userTyping';

interface IUserStore {
  /**
   * User is authenticated
   */
  auth: boolean;

  /**
   * User object
   * @type {IUser}
   */
  user: IUser | null;

  /**
   * Set user
   * @param {IUser} user
   */
  setUser: (user: IUser | null) => void;

  /**
   * Set auth
   * @param {boolean} auth
   */
  setAuth: (auth: boolean) => void;
}

const userStore = (set: any, get: any) => ({
  auth: false,
  user: null,
  setUser: (user: IUser | null) => set({user}),
  setAuth: (auth: boolean) => set({auth}),
});

export const useUserStore = create(
  persist<IUserStore>(userStore, {
    name: 'userStore',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
