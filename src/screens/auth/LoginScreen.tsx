import React, {useEffect} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLOURS} from '../../constants/generalConstants';
import {useUserStore} from '../../store/userStore';
import {supabase} from '../../supabase/supabase';

export default function LoginScreen() {
  const user = useUserStore(state => state.user);
  const auth = useUserStore(state => state.auth);

  const signInWithGoogle = async () => {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) console.log('error', error);
      if (data && data.url) Linking.openURL(data.url);
    } catch (error) {
      console.log('error', error);
    }
  };

  const logOUt = async () => {
    try {
      const {error} = await supabase.auth.signOut();
      if (error) console.log('error', error);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Linking.addEventListener('url', event => {
      console.log('event', event);
      const urlString = event.url.replace('app#', 'app?');
      const url = new URL(urlString);
      const accessToken = url.searchParams.get('access_token');
      const refreshToken = url.searchParams.get('refresh_token');
      // Login with the refresh token in supabase
      if (accessToken && refreshToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles['logo-container']}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>KikouniLendar</Text>
      <Text style={styles.subtitle}>The Lovely Calendar</Text>
      <View style={styles['login-area']}>
        <Pressable
          style={styles.button}
          android_ripple={{
            color: COLOURS.LIGHT_GREY,
            radius: 45,
            borderless: true,
          }}
          onPress={signInWithGoogle}>
          <Image
            source={require('../../../assets/images/google-logo.png')}
            style={styles.google}
          />
        </Pressable>
        <Text style={styles.subtitle}>Connect with Google</Text>
      </View>
      {user && (
        <View>
          <Text style={styles.subtitle}>{user.email}</Text>
          <Text style={styles.subtitle}>Logged: {JSON.stringify(auth)}</Text>
          <Pressable onPress={logOUt}>
            <Text style={styles.subtitle}>Log out</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'logo-container': {
    width: '60%',
    aspectRatio: 0.89,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOURS.BLACK,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: COLOURS.BLACK,
  },
  'login-area': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 60,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    aspectRatio: 1,
  },
  google: {
    resizeMode: 'contain',
    width: '100%',
  },
});
