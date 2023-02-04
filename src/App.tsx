/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const setUser = useUserStore(state => state.setUser);
  const setAuth = useUserStore(state => state.setAuth);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setUser(session.user as IUser);
      setAuth(true);
    }
    if (event === 'SIGNED_OUT') {
      setUser(null);
      setAuth(false);
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, styles.container]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AuthNavigator />
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
