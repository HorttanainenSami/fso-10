import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = () => {
  const repositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    });

  return{
    repositories,
  };
};

export default useRepositories;
