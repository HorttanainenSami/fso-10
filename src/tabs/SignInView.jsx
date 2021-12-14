import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../storage/authStorage';

const authStorage = new AuthStorage();
const initialValues = {
  username:'',
  password: '',
};
const validationSchema = yup.object().shape({
  username: yup
  .string()
  .min(3, 'too short')
  .max(50, 'username must be <50 characters')
  .required('Username is required')
  , 
  password: yup
  .string()
  .min(6, 'password too short')
  .required('password is required')

});
const SigninForm = ({onSubmit}) => {
  return(
    <View style={{display:'flex'}}>
      <FormikTextInput name='username' placeholder='username'/>
      <FormikTextInput name='password' placeholder='password' secureTextEntry={true}/>
      <Button handlePress={onSubmit} text='Sign in' />
    </View>
  );
};
const SignIn = () => {
  const {login} = useSignIn();

  const onPress = async (values) => {
    const username = values.username;
    const password = values.password;

    try{
      const response = await login({username, password});
      const token = response.data.authorize.accessToken;
      authStorage.setAccessToken(token)
        .then(response => authStorage.getAccessToken().then(r => console.log(r)));
    
    } catch (e) {
      console.log(e);
    }
  };

  return (
  <Formik 
    initialValues={initialValues} 
    onSubmit={onPress} 
    validationSchema={validationSchema}
    >
    {({handleSubmit}) =><SigninForm onSubmit={handleSubmit}/>}
  </Formik>
  );
};

export default SignIn;
