import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenTypes} from '../typings/ScreenTypes';
import {AppScreens} from '../constants/screenConstants';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const AuthNavigator: React.FunctionComponent = () => {
  const AuthStack = createNativeStackNavigator<ScreenTypes>();
  return (
    <AuthStack.Navigator
      initialRouteName={AppScreens.LoginScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={AppScreens.LoginScreen} component={LoginScreen} />
      <AuthStack.Screen
        name={AppScreens.RegisterScreen}
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
