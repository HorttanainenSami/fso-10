import React from 'react';
import { View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';
import RepositoryList from '../tabs/RepositoryList';
import AppBar from './AppBar';
import SignIn from '../tabs/SignInView';


const Main = () =>{
  return(
      <View >
      <AppBar />
        <Switch>
          <Route path='/signin' exact>
            <SignIn />
          </Route>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Redirect to='/' />
        </Switch>
      </View>
  );

};
export default Main;

