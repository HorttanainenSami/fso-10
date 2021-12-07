import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';


const styles = StyleSheet.create({
    container: { 
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appbarbackgroundPrimary,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    pressable:{
      margin: 5,
    }
});
const AppBar = () => (
  <View style={styles.container}>
    <ScrollView horizontal>
      <Pressable style={({pressed}) => [
        styles.pressable,
        { 
          backgroundColor: pressed ? 
          theme.colors.buttonPrimary :
          theme.colors.backGroundPrimary},
        ]
          
        }>
        <Link to ='/'>
          <Text color='textWhite'>
              Repositories
          </Text>
        </Link>
      </Pressable>
      <Pressable style={({pressed}) => [
        styles.pressable,
        { 
          backgroundColor: pressed ? 
          theme.colors.buttonPrimary :
          theme.colors.backGroundPrimary}]
        } >
        <Link to='/signin' >
          <Text color='textWhite'>
            Sign in
          </Text>
        </Link>
      </Pressable>
    </ScrollView>
  </View>
);

export default AppBar;
