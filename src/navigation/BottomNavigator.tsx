import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {COLOURS} from '../constants/generalConstants';
import {AppScreens} from '../constants/screenConstants';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {Image, Platform, View} from 'react-native';
import LoverScreen from '../screens/LoverScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const [currentTab, setCurrentTab] = useState('home');
  return (
    <Tab.Navigator
      initialRouteName={AppScreens.HomeScreen}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLOURS.BLACK,
        tabBarInactiveTintColor: COLOURS.BLACK,
        gestureEnabled: false,
        headerShown: false,
        tabBarStyle: styles.tab,
        tabBarLabelStyle: styles.tabItem,

        tabBarIcon: ({focused}) => {
          let source = require('../../assets/images/home-icon.png');
          let containerStyle = focused ? styles.activeContainer : {};

          if (route.name === AppScreens.HomeScreen) {
            source = require('../../assets/images/home-icon.png');
          }
          if (route.name === AppScreens.LoverScreen) {
            source = require('../../assets/images/heart-icon.png');
          }
          if (route.name === AppScreens.SettingsScreen) {
            source = require('../../assets/images/settings-icon.png');
          }

          return (
            <View style={containerStyle}>
              <Image
                resizeMode="contain"
                style={[styles.image, focused && styles.activeImage]}
                source={source}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen
        name={AppScreens.HomeScreen}
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabelStyle:
            currentTab === 'home' ? styles.tabItemActive : styles.tabItem,
        }}
        listeners={{
          tabPress: () => {
            setCurrentTab('home');
          },
        }}
      />
      <Tab.Screen
        name={AppScreens.LoverScreen}
        component={LoverScreen}
        options={{
          title: 'Lover',
          tabBarLabelStyle:
            currentTab === 'home' ? styles.tabItemActive : styles.tabItem,
        }}
        listeners={{
          tabPress: () => {
            setCurrentTab('home');
          },
        }}
      />
      <Tab.Screen
        name={AppScreens.SettingsScreen}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          unmountOnBlur: true,
          tabBarLabelStyle:
            currentTab === 'settings' ? styles.tabItemActive : styles.tabItem,
        }}
        listeners={{
          tabPress: () => {
            setCurrentTab('settings');
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = ScaledSheet.create({
  tab: {
    paddingBottom: Platform.OS === 'ios' ? scale(20) : scale(10),
    width: '100%',
    height: scale(70),
    backgroundColor: COLOURS.LIGHT_BLUE,
    shadowColor:
      Platform.OS === 'android' ? 'rgba(118, 227, 255, 0.1)' : COLOURS.BLACK,
    paddingTop: scale(10),
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: COLOURS.TRANSPARENT,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    fontWeight: 'bold',
  },
  tabItem: {
    fontWeight: '600',
    fontSize: scale(9),
  },
  tabItemActive: {
    fontWeight: 'bold',
    fontSize: scale(10),
  },
  activeContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLOURS.LIGHT_PINK,
    //paddingLeft: Platform.OS === 'ios' ? scale(32.5) : scale(35),
    paddingTop: Platform.OS === 'ios' ? 17.2 : 19.2,
    height: Platform.OS === 'ios' ? scale(100) : scale(105),
    width: scale(85),
    bottom: -20,
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: COLOURS.WHITE,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  image: {
    height: scale(20),
    aspectRatio: 1,
  },
  activeImage: {
    height: scale(25),
  },
});
