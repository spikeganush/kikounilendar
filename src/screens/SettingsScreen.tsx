import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {useUserStore} from '../store/userStore';
import {COLOURS} from '../constants/generalConstants';
import {supabase} from '../supabase/supabase';
import {commonStyles} from '../constants/stylesConstant';

const SettingsScreen = () => {
  const user = useUserStore(state => state.user);
  const profilePicture = user?.user_metadata.avatar_url;

  // Function to logout user from supabase
  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {profilePicture && profilePicture !== '' ? (
          <Image
            source={{uri: profilePicture}}
            style={styles['profile-picture']}
          />
        ) : null}

        <Text style={commonStyles.text}>{user?.user_metadata.full_name}</Text>
      </View>
      <View style={styles['button-container']}>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles['button-text']}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
  },
  'profile-picture': {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  'button-container': {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLOURS.LIGHT_PINK,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 5,
  },
  'button-text': {
    color: COLOURS.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
