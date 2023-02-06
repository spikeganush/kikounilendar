import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenTypes} from '../typings/ScreenTypes';
import {AppScreens} from '../constants/screenConstants';
import LoginScreen from '../screens/auth/LoginScreen';

const AuthNavigator: React.FunctionComponent = () => {
  const AuthStack = createNativeStackNavigator<ScreenTypes>();
  return (
    <AuthStack.Navigator
      initialRouteName={AppScreens.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={AppScreens.LoginScreen} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
