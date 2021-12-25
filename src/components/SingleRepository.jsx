import React from 'react';
import RepositoryItem from './RepositoryItem/index';
import {StyleSheet, View, FlatList } from 'react-native';
import { useParams } from 'react-router';
import { GET_REPOSITORY } from '../gql/queries';
import { useLazyQuery } from '@apollo/client';
import LinkButton from './LinkButton';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';



const styles = StyleSheet.create({
  grid : {
    display:'grid',
    gridTemplateRows:"auto auto auto",
    gridTemplateColumns: "80px auto",
    gridRowGap: 5,
    padding: 5,
  },
  reviewSymbol: {
    gridRowStart: '1',
    gridRowEnd: '4',
    color: theme.colors.primary,
    borderColor:theme.colors.primary,
    paddingTop: 20,
    margin: 5,
    borderWidth: 2,
    borderRadius: '50%',
    width: 60,
    height: 60,
    textAlign: 'center',
  },
  date: {
    color: theme.colors.buttonPrimary,
  },
  seperator : {
    backgroundColor: theme.colors.seperator,
    height:5,
  }

});

const ItemSeperator = () => <View style={styles.seperator} />;

const RenderReview = ({review}) => {

  return( 
    <View style={styles.grid}>
      <Text fontWeight='bold' style={styles.reviewSymbol}>
        {review.rating}
      </Text>
      <Text>
        {review.user.username}
      </Text>
      <Text style={styles.date}>
        {format( new Date(review.createdAt), 'dd/MM/yyyy') }
      </Text>
      <Text>
        {review.text}
      </Text>
    </View>
  );


};
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
  return (
    <FlatList
      data = {reviews}
      renderItem={({ item }) => <RenderReview review={item}/>}
      ListHeaderComponent = {() => <RepositoryInfo item={repository} />}
      ItemSeparatorComponent ={ItemSeperator}>
      keyExtractor = {(item) => item.id }
    </FlatList>
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
