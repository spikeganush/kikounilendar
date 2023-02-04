import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
//import {supabase} from '../../supabase/supabase';
import {COLOURS} from '../../constants/generalConstants';

export default function LoginScreen() {
  console.log(SUPABASE_URL, SUPABASE_ANON_KEY);

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
          }}>
          <Image
            source={require('../../../assets/images/google-logo.png')}
            style={styles.google}
          />
        </Pressable>
        <Text style={styles.subtitle}>Connect with Google</Text>
      </View>
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
