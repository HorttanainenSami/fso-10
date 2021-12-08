import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    padding: 5,
    margin: 5,
    borderWidth:1,
    fontFamily: theme.fonts.main,
  },
  error:{
    borderColor:'red',
  },
});

const TextInput = ({style, error, ...props}) => {
  const TextInputStyles =[
    styles.text,
    style,
    error  && styles.error,
    
];

  return(
    <NativeTextInput
      style={TextInputStyles}
      {...props}
    />
  );

};


export default TextInput;
