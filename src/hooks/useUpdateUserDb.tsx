import {useUserStore} from '../store/userStore';
import {supabase} from '../supabase/supabase';
import {IUserDb} from '../typings/userTyping';

const useUpdateUserDb = () => {
  const setUserDb = useUserStore(state => state.setUserDb);
  const updateUserDb = async (user: IUserDb) => {
    try {
      const {error} = await supabase
        .from('profiles')
        .update(user)
        .match({id: user.id});
      if (error) {
        console.log('Database error', error);
      } else {
        const newUserDb = user;
        setUserDb(newUserDb);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return {updateUserDb};
};

export default useUpdateUserDb;
