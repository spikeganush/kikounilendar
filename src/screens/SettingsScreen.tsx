import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Switch,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUserStore} from '../store/userStore';
import {COLOURS} from '../constants/generalConstants';
import {supabase} from '../supabase/supabase';
import {commonStyles} from '../constants/stylesConstant';
import Icon from 'react-native-vector-icons/FontAwesome';
import useUpdateUserDb from '../hooks/useUpdateUserDb';
import {useErrorStore} from '../store/errorStore';
import {checkUsername} from '../utils/generalUtilities';

const SettingsScreen = () => {
  const user = useUserStore(state => state.user);
  const userDb = useUserStore(state => state.userDb);
  const setUserDb = useUserStore(state => state.setUserDb);
  const profilePicture = user?.user_metadata.avatar_url;
  const logOutStore = useUserStore(state => state.logOut);
  const error = useErrorStore(state => state.error);
  const setError = useErrorStore(state => state.setError);

  const [editUsername, setEditUsername] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const {updateUserDb} = useUpdateUserDb();

  // Function to logout user from supabase
  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      console.log('Error logging out: ', error.message);
    } else {
      logOutStore();
    }
  };
  const handleSubmitUsername = async () => {
    setError({message: '', isErrored: false});
    if (!userDb) return;
    try {
      const stopAtzero = await checkUsername({
        userName,
        userDb,
        setEditUsername,
        setUserName,
        setError,
      });
      if (stopAtzero === 0) return;

      const newUserDb = {...userDb, username: userName.trim()};
      updateUserDb(newUserDb);
    } catch (error) {
      console.log('error', error);
    }
  };

  const togglePersonnalSwitch = async () => {
    if (!userDb) return;
    try {
      const newUserDb = {
        ...userDb,
        personal_notifications: !userDb.personal_notifications,
      };
      updateUserDb(newUserDb);
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleLoverSwitch = async () => {
    if (!userDb) return;
    try {
      const newUserDb = {
        ...userDb,
        lover_notifications: !userDb.lover_notifications,
      };
      updateUserDb(newUserDb);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleDeleteLover = async () => {
    if (!userDb) return;
    try {
      const {error} = await supabase
        .from('profiles')
        .update({lover_id: null})
        .match({id: userDb.id});
      if (error) {
        setError({message: 'Database error', isErrored: true});
      } else {
        const newUserDb = {
          ...userDb,
          lover_id: null,
        };
        setUserDb(newUserDb);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    let unsubscribe = false;
    if (!unsubscribe && userDb) {
      setUserName(userDb.username ?? '');
    }
    return () => {
      unsubscribe = true;
    };
  }, [userDb]);

  return (
    <View style={[styles.container, commonStyles.padding]}>
      <View style={styles.info}>
        <View style={[styles.header, commonStyles.padding]}>
          {profilePicture ? (
            <Image
              source={{uri: profilePicture}}
              style={styles['profile-picture']}
            />
          ) : null}
          <Text style={commonStyles.text}>{user?.user_metadata.full_name}</Text>
        </View>

        <View style={[styles['user-info__container'], commonStyles.padding]}>
          <View style={styles['user-info__username']}>
            {editUsername ? (
              <>
                <TextInput
                  style={[
                    commonStyles.text,
                    styles['user-info__input-text'],
                    error.isErrored && styles['user-info__input-text-error'],
                  ]}
                  placeholder="Enter a username"
                  placeholderTextColor={COLOURS.LIGHT_GREY}
                  onChangeText={text => setUserName(text)}
                  value={userName}
                />
                <View style={styles['user-info__icons']}>
                  <Icon
                    name="check-circle"
                    size={30}
                    color={COLOURS.GREEN}
                    style={{marginRight: 20}}
                    onPress={handleSubmitUsername}
                  />
                  <Icon
                    name="trash"
                    size={30}
                    color={COLOURS.LIGHT_PINK}
                    style={{marginRight: 20}}
                    onPress={() => setUserName('')}
                  />
                  <Icon
                    name="times-circle"
                    size={30}
                    color={COLOURS.LIGHT_GREY}
                    onPress={() => {
                      setEditUsername(false);
                      setError({message: '', isErrored: false});
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={[commonStyles.text, styles['user-info__text']]}>
                  {userDb?.username ?? 'Enter a username'}
                </Text>
                <Icon
                  name="edit"
                  size={20}
                  color={COLOURS.LIGHT_BLUE}
                  onPress={() => {
                    setEditUsername(true);
                    setUserName(userDb?.username ?? '');
                  }}
                />
              </>
            )}
          </View>
          <Text style={[commonStyles.text, styles['user-info__text']]}>
            {user?.email}
          </Text>
          {error.isErrored && (
            <Text style={[commonStyles.text, styles['user-info__text-error']]}>
              {error.message}
            </Text>
          )}
          <View style={styles['user-notification__container']}>
            <View style={styles['user-notification__switch-area']}>
              <Text style={[commonStyles.text, styles['user-info__text']]}>
                Your calendar notifications:
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  userDb?.personal_notifications ? COLOURS.GREEN : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={togglePersonnalSwitch}
                value={userDb?.personal_notifications}
              />
            </View>
            <View style={styles['user-notification__switch-area']}>
              <Text style={[commonStyles.text, styles['user-info__text']]}>
                Lover calendar notifications:
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={
                  userDb?.lover_notifications ? COLOURS.GREEN : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleLoverSwitch}
                value={userDb?.lover_notifications}
              />
            </View>
            <View style={styles['lover-area']}>
              <Text style={[commonStyles.text, styles['user-info__text']]}>
                Lover: {userDb?.lover_id ?? 'No lover'}
              </Text>
              {userDb?.lover_id ? (
                <Icon
                  name="trash"
                  size={20}
                  color={COLOURS.LIGHT_PINK}
                  onPress={handleDeleteLover}
                />
              ) : null}
            </View>
          </View>
        </View>
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
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLOURS.LIGHT_BLUE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  'profile-picture': {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  'user-info__container': {
    display: 'flex',
    textAlign: 'left',
    width: '100%',
    elevation: 5,
    minHeight: '50%',
    backgroundColor: COLOURS.BLACK,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  'user-info__text': {
    color: COLOURS.LIGHT_BLUE,
  },
  'user-info__text-error': {
    color: COLOURS.RED,
  },
  'user-info__username': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'user-info__input-text': {
    backgroundColor: COLOURS.WHITE,
    paddingHorizontal: 10,
    width: '60%',
  },
  'user-info__input-text-error': {
    borderColor: COLOURS.RED,
    borderWidth: 3,
  },
  'user-info__icons': {
    display: 'flex',
    flexDirection: 'row',
  },
  'user-notification__container': {
    display: 'flex',
    width: '100%',
    marginTop: 30,
  },
  'user-notification__switch-area': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  'lover-area': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
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
