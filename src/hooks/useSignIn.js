import { AUTHORIZE_USER } from '../gql/mutation';
import React from 'react';
import { useMutation } from '@apollo/client';


const useSignIn = () => {
  const [ authorizeUser, {error} ] = useMutation(AUTHORIZE_USER);

  const login =async ({username, password}) => {
    const credentials = { username, password};

    const payload = await authorizeUser({ variables: {credentials}});
    return payload;
   };

  return { login, error };
};


export default useSignIn;
