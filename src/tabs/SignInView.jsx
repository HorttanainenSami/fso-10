import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import Button from '../components/Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';
import AuthStorageContext from '../contexts/authStorageContext';

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
    <View>
      <FormikTextInput testID='username' name='username' placeholder='username'/>
      <FormikTextInput testID='password' name='password' placeholder='password' secureTextEntry={true}/>
      <Button testID='submitButton' handlePress={onSubmit} text='Sign in' />
    </View>
  );
};
export const SignInContainer = ({onPress}) => {

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
const SignIn = () => {
  const [login] = useSignIn();

  let history = useHistory();
  const auth = React.useContext(AuthStorageContext);

  const onPress = async (values) => {
    const username = values.username;
    const password = values.password;

    try{
      const { data } = await login({username, password});
      await auth.setAccessToken(data.authorize.accessToken);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInContainer onPress={onPress} login={login} />;
};

export default SignIn;
