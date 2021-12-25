import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  pressable: {
    margin: 5,
  },

});
const AppBarTab = ({ text, link, onPress }) => {
  return(
    <Link to={link} onPress={ onPress } style={styles.pressable} component={TouchableOpacity} activeOpacity={0.8} >  
        <Text color='textWhite'>
          { text }
        </Text>
    </Link>
  );

};

export default AppBarTab;
