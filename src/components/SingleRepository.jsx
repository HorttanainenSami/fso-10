import React from 'react';
import RepositoryItem from './RepositoryItem/index';
import { View } from 'react-native';
import { useParams } from 'react-router';
import { GET_REPOSITORY } from '../gql/queries';
import { useLazyQuery } from '@apollo/client';
import LinkButton from './LinkButton';
const SingleRepository = () => {
  const id = useParams().id;
  const [ getRepository, result] = useLazyQuery(GET_REPOSITORY);
  const [ item, setItem ] = React.useState();
   
  React.useEffect(() => {
    getRepository({variables: {id}});
  }, [id]);
  
  React.useEffect( () => {
    if(!result?.loading && result?.called){
      console.log(result.data.repository);
      setItem(result.data.repository);
    }
  }, [result]);

  return (
    <View>
      { item && 
        <>
          <RepositoryItem item={item} />
          <LinkButton text='GitHub' link={item.url}/>
        </>
      }
    </View>
  );

};


export default SingleRepository;
