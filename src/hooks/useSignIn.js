import { AUTHORIZE_USER } from '../gql/mutation';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/authStorageContext';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [ mutation, result ] = useMutation(AUTHORIZE_USER);
  
  const logout = async () => {
    await authStorage.deleteAccessToken();
    apolloClient.resetStore();
    return;
  };

  const login = async ({username, password}) => {
    const credentials = { username, password};
    const payload = await mutation({ variables: {credentials}});
    try {
      await authStorage.setAccessToken(payload.data.authorize.accessToken);
    } catch (e) {
      console.log(e);
    }
    apolloClient.resetStore();
    return payload;
   };

  return [ login, logout, result];
};


export default useSignIn;
