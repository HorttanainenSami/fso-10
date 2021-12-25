import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from '../components/RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'grey',
  },
});


const ItemSeparator = () =>  <View style={styles.separator}/>;

const renderItem = ({item}) => {
  return(
    <Link to={`/repository/${item.id}`}>
      <RepositoryItem item={item} />
    </Link>
  );

};

export const RepositoryListContainer = ({repositories}) => {
  const repositoryEdges = repositories ? repositories.edges.map(edge => edge.node): [];
  return (
    <FlatList
      data={repositoryEdges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id}
      // other props
    />
  );
};
const RepositoryList = () => {
  const {data } = useRepositories();

  return <RepositoryListContainer repositories={data?.repositories} />;
};

export default RepositoryList;
