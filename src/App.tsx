/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthNavigator from './navigation/AuthNavigator';
import {supabase} from './supabase/supabase';
import {useUserStore} from './store/userStore';
import {IUser} from './typings/userTyping';
import MainNavigator from './navigation/MainNavigator';
import {useUpdateDate} from './hooks/useUpdateDate';
import {navigationRef} from './utils/rootNavigation';
import {AppScreens} from './constants/screenConstants';

function App(): JSX.Element {
  const {updateDate} = useUpdateDate();
  const isDarkMode = useColorScheme() === 'dark';
  const auth = useUserStore(state => state.auth);
  const user = useUserStore(state => state.user);
  const userDb = useUserStore(state => state.userDb);
  const setUser = useUserStore(state => state.setUser);
  const setUserDb = useUserStore(state => state.setUserDb);
  const setAuth = useUserStore(state => state.setAuth);

  const getUserDb: any = async () => {
    const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id);
    if (error) {
      console.log('error', error);
    } else {
      setUserDb(data[0]);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          setUser(session.user as IUser);
          setAuth(true);
        } catch (error) {
          console.log('error', error);
        }
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      }
    });
  }, []);

  useEffect(() => {
    updateDate();
  }, []);

  useEffect(() => {
    if (user) {
      getUserDb();
    }
  }, [user]);

  useEffect(() => {
    if (userDb && !userDb.username) {
      // Redirect to settings screen
      navigationRef.navigate(AppScreens.SettingsScreen as never);
    }
  }, [userDb]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {!auth ? <AuthNavigator /> : <MainNavigator />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
