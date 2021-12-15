import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  pressable: {
    margin: 5,
    color: theme.colors.buttonPrimary,
  },
  pressed : {
    color: theme.colors.backGroudPrimary
  },

});
const AppBarTab = ({ text, link, onPress }) => {
  return(
    <Link to={link} compoent={Pressable} onPress={ onPress } style={styles.pressable} activeOpacity={0.8} underlayColor='#DDDDDD' >  
        <Text color='textWhite'>
          { text }
        </Text>
    </Link>
  );

};

export default AppBarTab;
