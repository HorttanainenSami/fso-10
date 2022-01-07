import React from 'react';
import RepositoryItem from './RepositoryItem/index';
import {StyleSheet, View, FlatList } from 'react-native';
import { useParams } from 'react-router';
import { GET_REPOSITORY } from '../gql/queries';
import { useLazyQuery } from '@apollo/client';
import LinkButton from './LinkButton';
import theme from '../theme';
import Review from './Review';

const styles = StyleSheet.create({
  seperator : {
    backgroundColor: theme.colors.seperator,
    height:5,
  }

});

const ItemSeperator = () => <View style={styles.seperator} />;

const RenderReview = ({item}) =>(
  <Review rating={item.rating} header={item.user.username} date={item.createdAt} text={item.text} />
);
const RepositoryInfo = ({item}) => {
  return(
        <>
          <RepositoryItem item={item} />
          <LinkButton text='GitHub' link={item.url}/>
          <ItemSeperator />
        </>
  );
};


const SingleRepositoryContainer = ({repository, reviews}) => {
  const onEndReach = () => {
    console.log('You have reached the end of list');
  };
  return (
    <FlatList
      data = {reviews}
      renderItem={RenderReview}
      ListHeaderComponent = {() => <RepositoryInfo item={repository} />}
      ItemSeparatorComponent ={ItemSeperator}
      onEndReached={onEndReach.bind(this)}
      onEndReachedThreshold={0.5}
      keyExtractor = {(item) => item.id }
    />
  );
};
const SingleRepository = () => {
  const [ getRepository, result] = useLazyQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network'
  });
  const id = useParams().id;
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
  const data = item ? item : [];
  const reviews = item ? item.reviews.edges.map(edge => edge.node) : [];
  return <SingleRepositoryContainer repository={data} reviews = {reviews} />;
};


export default SingleRepository;
