import {create} from 'zustand';
import {IError} from '../typings/generalTypings';

interface IErrorStore {
  error: IError;
  setError: (error: IError) => void;
}

const errorStore = (set: any, get: any) => ({
  error: {
    message: '',
    isErrored: false,
  },
  setError: (error: IError) => set({error}),
});

export const useErrorStore = create<IErrorStore>(errorStore);
