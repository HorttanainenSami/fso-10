import React from 'react';
import { View } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../components/Button';
import { useMutation } from '@apollo/client';
import {CREATE_USER} from '../gql/mutation';
import Text from '../components/Text';
import { useHistory } from 'react-router';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};


const validationSchema = yup.object().shape({
  username: yup
            .string()
            .max(30, 'Username must be between 1 and 30 characters')
            .required('Username name is required'),
  password: yup
            .string()
            .min(5, 'Password must be atleast 5 characters long')
            .max(50, 'Password can be only 50 characters long')
            .required('Username name is required'),
  passwordConfirmation: yup
             .string()
  .oneOf([yup.ref('password')],'Password and password confirmation must be equivalent')
             .required('Password confirm is required')
});
const SignUpForm = ({onSubmit}) => {
  return(
    <View>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
      <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true}/>
      <Button text='Create a new user' handlePress={onSubmit}/>
    </View>
  );
};
const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [ error , setError] = React.useState('');
  const history = useHistory();
  const handleSubmit = async (values) => {

    const user = { 
      username: values.username,
      password: values.password
    }; 
    try {
      await createUser({variables: {user}});
      history.push('/login');
    } catch (e) {
      setError(e.message);
    }

  };
  return(
    <>
      { error && <Text color='textError'> {error} </Text>}
      <Formik 
        initialValues={initialValues}
        onSubmit ={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit} ) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </>
    
  );
};

export default SignUp;
