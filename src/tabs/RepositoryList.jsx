import React from 'react';
import { Image, FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from '../components/Text';
import CountAndDescription from '../components/CountAndDescription';
import useRepositories from '../hooks/useRepositories';
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'grey',
  },
  item: {
    margin: 5,
  }
});


const ItemSeparator = () =>  <View style={styles.separator}/>;
const renderItem = ({item}) => {
  return(
    <View style = {styles.item}>
    <View style= {{flexDirection: 'row'}}>
    <Image style = {{...theme.tinyLogo, flexGrow: 0 }} source = {{uri: item.ownerAvatarUrl}} />
    <View style= {{ margin:5, alignItems: 'flex-start' }}>
    <Text fontWeight='bold' >{item.fullName} </Text>
    <Text color='textSecondary'>{item.description} </Text>
    <Text color='textWhite' style={{ flexGrow: 0, padding: 5, borderRadius:5,  backgroundColor: theme.colors.primary}}>{item.language} </Text>
        </View>
      </View>
    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
      <CountAndDescription count={item.stargazersCount} text='stars' />
      <CountAndDescription count={item.forksCount} text='forks' />
      <CountAndDescription count={item.reviewCount} text='Reviews' />
      <CountAndDescription count={item.ratingAverage} text='Rating' />
      </View>
    </View>
  );
};

const RepositoryList = () => {
  const {repositories} = useRepositories();
  const repositoryEdges = repositories ? repositories.data?.repositories?.edges.map(edge => edge.node): [];

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

export default RepositoryList;
