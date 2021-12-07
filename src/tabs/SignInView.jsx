import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import * as yup from 'yup';

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
const onPress = (values) => {
  const username = values.username;
  const password = values.password;

  console.log(`username: ${username} and password ${password}`);
};
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
