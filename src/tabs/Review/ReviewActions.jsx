import React from 'react';
import Review from '../../components/Review';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '../../components/Button';
import { useHistory } from 'react-router';
import { REMOVE_REVIEW } from '../../gql/mutation';
import { useMutation } from '@apollo/client';
const styles = StyleSheet.create({
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'auto auto',
    gridrowGap: 5,
    padding: 5,
  },
  review: {
    gridColumnStart: '1',
    gridColumnEnd: '3',
  },
});
const ReviewActions = ({item, refetch}) => {
  const history = useHistory();
  const [ mutation ] = useMutation(REMOVE_REVIEW);
  const handleViewRepository = () => {
    history.push(`/repository/${item.repositoryId}`);
  };
  const removeReview = async () => {
    await mutation({variables:{id:item.id}});    
    refetch();

  };
  const pushAlert = () =>
    Alert.alert(
      "Delete review",
      "are you sure you want to remove this review",
      [
        {
          text: "Delete",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => removeReview }
      ]
    );
  

  return(
    <View style={styles.grid}>
      <Review style={styles.review} rating={item.rating} header={item.repository.fullName} date={item.createdAt} text={item.text} />
    <Button handlePress={handleViewRepository} text='View repository' />
    <Button handlePress={pushAlert} color='red' text='Delete review' />
  </View>
  );
};

export default ReviewActions;
