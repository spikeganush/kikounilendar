import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {IUser, IUserDb} from '../typings/userTyping';

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

  /**
   * User database object
   * @type {IUserDb}
   * @default null
   */
  userDb: IUserDb | null;

  /**
   * Set user database
   * @param {IUserDb} userDb
   */
  setUserDb: (userDb: IUserDb | null) => void;

  /**
   * Logout user
   */
  logOut: () => void;
}

const userStore = (set: any, get: any) => ({
  auth: false,
  user: null,
  setUser: (user: IUser | null) => set({user}),
  setAuth: (auth: boolean) => set({auth}),
  userDb: null,
  setUserDb: (userDb: IUserDb | null) => set({userDb}),
  logOut: () => {
    set({auth: false, user: null, userDb: null});
  },
});

export const useUserStore = create(
  persist<IUserStore>(userStore, {
    name: 'userStore',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
