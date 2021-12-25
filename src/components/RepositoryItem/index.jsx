import React from 'react';
import CountAndDescription from './CountAndDescription';
import { Image, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import Text from '../Text';
 
const styles = StyleSheet.create({
  item: {
    margin: 5,
  }

});

const RepositoryItem = ({item}) => {

  return(
    <View style={styles.item}>
      <View style= {{flexDirection: 'row'}}>
        <Image style = {{...theme.tinyLogo, flexGrow: 0 }} source = {{uri: item.ownerAvatarUrl}} />
        <View style= {{ margin:5, alignItems: 'flex-start' }}>
          <Text testID='repositoryName' fontWeight='bold' >{item.fullName} </Text>
          <Text testID='description' color='textSecondary'>{item.description} </Text>
          <Text testID='language' color='textWhite' style={{ flexGrow: 0, padding: 5, borderRadius:5,  backgroundColor: theme.colors.primary}}>{item.language} </Text>
        </View>
      </View>
    <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
      <CountAndDescription testID='stargazers' count={item.stargazersCount} text='Stars' />
      <CountAndDescription testID='forks' count={item.forksCount} text='Forks' />
      <CountAndDescription testID='reviews' count={item.reviewCount} text='Reviews' />
      <CountAndDescription testID='ratings' count={item.ratingAverage} text='Rating' />
      </View>
    </View>
  );


};


export default RepositoryItem;
