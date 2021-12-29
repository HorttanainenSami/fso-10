import React  from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from '../components/RepositoryItem';
import theme from '../theme';
import { Picker } from '@react-native-picker/picker';
 
const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.seperator,
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
const Seperator = ({sort, setSort } ) => {
  return(
    <Picker
      selectedValue={sort}
      onValueChange={(itemValue ) => setSort(JSON.parse(itemValue))
      }>
    <Picker.Item label="Lastest" value={JSON.stringify({orderBy:"CREATED_AT"})} />
    <Picker.Item label="Highest rated" value={JSON.stringify({orderDirection:'DESC', orderBy:"RATING_AVERAGE"})} />
    <Picker.Item label="Lowest rated" value={JSON.stringify({orderDirection: 'ASC', orderBy:"RATING_AVERAGE"})} />
    </Picker>
  );
};

export const RepositoryListContainer = ({repositories, sortedBy, setSortedBy}) => {
  const repositoryEdges = repositories ? repositories.edges.map(edge => edge.node): [];
  return (
    <FlatList
      data={repositoryEdges}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Seperator sort={sortedBy} setSort={setSortedBy} />}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id}
    />
  );
};
const RepositoryList = () => {
  const [variables, setSortedBy ] = React.useState();
  const { data } = useRepositories(variables);
  React.useEffect( () => {
    console.log(variables);
   }, [variables]);
  return <RepositoryListContainer sorted={variables} setSortedBy={setSortedBy} repositories={data?.repositories} />;
};

export  default RepositoryList;
