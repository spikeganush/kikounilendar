import {supabase} from '../supabase/supabase';
import {IError} from '../typings/generalTypings';
import {IUserDb} from '../typings/userTyping';

interface ICheckUsernameProps {
  userName: string;
  userDb: IUserDb;
  setEditUsername: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setError: (error: IError) => void;
}

export const checkUsername = async (props: ICheckUsernameProps) => {
  const {userName, userDb, setEditUsername, setUserName, setError} = props;
  if (userName === '') {
    setError({message: 'Username cannot be empty', isErrored: true});
    return 0;
  }
  if (userName.length < 3) {
    setError({
      message: 'Username must be at least 3 characters',
      isErrored: true,
    });
    return 0;
  }
  if (userName === userDb?.username) {
    setEditUsername(false);
    return 0;
  }
  const {data} = await supabase.from('profiles').select('*');
  const userNameExists =
    data &&
    data.find(
      (user: IUserDb) =>
        user?.username &&
        user.username.toLowerCase().trim() === userName.toLowerCase().trim(),
    );
  if (userNameExists) {
    setError({message: 'Username already exists', isErrored: true});
    setUserName('');
    return 0;
  } else {
    setError({message: '', isErrored: false});
  }
};
