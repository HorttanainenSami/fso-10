import React from 'react';
import { View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';
import RepositoryList from '../tabs/RepositoryList';
import AppBar from './AppBar';
import SignIn from '../tabs/SignInView';
import SingleRepository from './SingleRepository';
import CreateReview from '../tabs/CreateReview';
import SignUp from '../tabs/SignUp';
import Reviews from '../tabs/Reviews';


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
          <Route path='/repository/:id'>
            <SingleRepository /> 
          </Route>
          <Route path='/createReview'>
            <CreateReview /> 
          </Route>
          <Route path='/signup'>
            <SignUp /> 
          </Route>
          <Route path='/myreviews'>
            <Reviews /> 
          </Route>
          <Redirect to='/' />
        </Switch>
      </View>
  );

};
export default Main;

