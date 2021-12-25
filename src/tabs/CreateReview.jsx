import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from '../components/FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '../components/Button';
import { useMutation } from '@apollo/client';
import {CREATE_REVIEW} from '../gql/mutation';
import Text from '../components/Text';

const styles = StyleSheet.create({
  multiline: {
    height: 100,
  },
});
const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '', // optional
};


const validationSchema = yup.object().shape({
  ownerName: yup
            .string()
            .required('Owner name is required'),
  repositoryName: yup
            .string()
            .required('Owner name is required'),
  rating: yup
          .number()
          .typeError('You must specify a number')
          .min(0, 'Rating between 0 and 100')
          .max(100, 'Rating between 0 and 100')
          .required('Rating required'),
});
const CreateReviewForm = ({onSubmit}) => {
  return(
    <View>
      <FormikTextInput name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput name='repositoryName' placeholder='Repository name' />
      <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput style={styles.multiline} multiline={true} name='text' placeholder='Review' />
      <Button text='Create a review' handlePress={onSubmit}/>
    </View>
  );
};
const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const [ error , setError] = React.useState('');
  const handleSubmit = async (values) => {

    const input = { ...values, rating:parseInt(values.rating)}; 
    console.log(input);
    try {
      await createReview({ variables : {input}});
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
        {({ handleSubmit} ) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </>
    
  );
};

export default CreateReview;
