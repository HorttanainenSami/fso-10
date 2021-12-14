import { AUTHORIZE_USER } from '../gql/mutation';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/authStorageContext';
import { useMutation } from '@apollo/client';


const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [ authorizeUser, {error} ] = useMutation(AUTHORIZE_USER);

  const login =async ({username, password}) => {
    const credentials = { username, password};

    const payload = await authorizeUser({ variables: {credentials}});
    const token = payload.data.authorize.accessToken;
    await authStorage.setAccessToken(token);
    return token;
   };

  return { login, error };
};


export default useSignIn;
