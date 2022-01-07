import React  from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from '../components/RepositoryItem';
import theme from '../theme';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
 
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
const Header = ({sort, setSort } ) => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [value] = useDebounce(searchQuery, 500);
  const onChangeSearch = query =>{
    setSearchQuery(query);
  };
  React.useEffect(() => {
    const fetch = {searchKeyword: value};
    setSort(fetch);
  }, [value]);
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <Picker
        selectedValue={sort}
        onValueChange={(itemValue ) => setSort(JSON.parse(itemValue))
        }>
        <Picker.Item label="Lastest" value={JSON.stringify({orderBy:"CREATED_AT"})} />
        <Picker.Item label="Highest rated" value={JSON.stringify({orderDirection:'DESC', orderBy:"RATING_AVERAGE"})} />
        <Picker.Item label="Lowest rated" value={JSON.stringify({orderDirection: 'ASC', orderBy:"RATING_AVERAGE"})} />
      </Picker>
    </>
  );
};

export const RepositoryListContainer = ({repositories, variables, setSortedBy}) => {
  const repositoryEdges = repositories ? repositories.edges.map(edge => edge.node): [];
  return (
    <FlatList
      data={repositoryEdges}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Header sort={variables} setSort={setSortedBy} />}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id}
      onEndReached={() => console.log('end reached')}
    />
  );
};
const RepositoryList = () => {
  const [variables, setSortedBy ] = React.useState();
  const { data } = useRepositories(variables);
  return <RepositoryListContainer sorted={variables} setSortedBy={setSortedBy} repositories={data?.repositories}  />;
};

export  default RepositoryList;
