import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = (variables) => {
  const { data } = useQuery(GET_REPOSITORIES, {
    variables: variables ,
    fetchPolicy: 'cache-and-network',
    });
  return{
    data,
  };
};

export default useRepositories;
