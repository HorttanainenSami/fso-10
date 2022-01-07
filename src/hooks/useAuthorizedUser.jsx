import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../gql/queries';

const useAuthorizedUser = (fetchReviews = false) => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { review: fetchReviews }});

    return { data };

};


export default useAuthorizedUser;
