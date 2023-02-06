import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppScreens} from '../constants/screenConstants';
import {ScreenList} from '../typings/navigationTypes';
import BottomNavigator from './BottomNavigator';

const MainNavigator: React.FunctionComponent = () => {
  const MainStack = createNativeStackNavigator<ScreenList>();
  return (
    <MainStack.Navigator
      initialRouteName={AppScreens.BottomNavigator}
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
        gestureEnabled: false,
      }}>
      <MainStack.Screen
        name={AppScreens.BottomNavigator}
        component={BottomNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
