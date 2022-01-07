import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../gql/queries';

const useAuthorizedUser = (fetchReviews = false) => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    variables: { review: fetchReviews }});

    return { data, refetch };

};


export default useAuthorizedUser;
