import React from 'react';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewActions from './ReviewActions';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.seperator,
  },
});

const RenderItem = ({item, refetch}) => {
  return item? <ReviewActions refetch={refetch} item={item} />: <></>;
};
const  ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const fetchReviews = true;
  const { data, refetch } = useAuthorizedUser(fetchReviews);

  const reviewEdges = data
    ? data?.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];
  return( 
      <FlatList
        data={reviewEdges} 
    renderItem={({item}) => <RenderItem refetch={refetch} item={item} /> }
        ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Reviews;
