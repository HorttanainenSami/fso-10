import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthorizedUser  from '../hooks/useAuthorizedUser';
import useSignIn from '../hooks/useSignIn';


const styles = StyleSheet.create({
    container: { 
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appbarbackgroundPrimary,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
});
const AppBar = () => {
  const [,logout ] = useSignIn();
  const { data } = useAuthorizedUser();
  const [ userLoggedin, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    console.log(data);
    if(data?.authorizedUser){
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }

  }, [data]);
  const logOut =async () => {
    await logout();  
  };
  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' link='/' />
        { userLoggedin 
          ? <>
              <AppBarTab text='Create review' link='/createReview' />
              <AppBarTab text='My reviews' link='/myreviews' />
              <AppBarTab text='Log out' link='/' onPress={logOut} />
            </>
          : <>
              <AppBarTab text='Sign in' link='/signin' /> 
              <AppBarTab text='Sign up' link='/signup' />
            </>
        }
      </ScrollView>
    </View>
  );
};


export default AppBar;
