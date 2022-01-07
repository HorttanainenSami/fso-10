import React from 'react';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import { FlatList, View, StyleSheet } from 'react-native';
import Review from '../components/Review';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.seperator,
  },
});
const renderItem = ({item}) => {
  console.log(item);

  return item? <Review rating={item.rating} header={item.repository.fullName} date={item.createdAt} text={item.text} />: <></>;
};
const  ItemSeparator = () => <View style={styles.separator} />;

const Reviews = () => {
  const fetchReviews = true;
  const { data } = useAuthorizedUser(fetchReviews);

  React.useEffect( () => {
    console.log(data);
  }, [data]);
  const reviewEdges = data!=undefined 
    ? data?.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];
  return( 
      <FlatList
        data={reviewEdges} 
        renderItem={renderItem }
        ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Reviews;
