import React from 'react';
import { Platform, TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    padding: 5,
    margin: 5,
    borderWidth:1,
    fontFamily: theme.fonts.main,
  },
  android:{
    fontFamily: theme.fonts.android,
  },
  ios:  {
    fontFamily: theme.fonts.ios,
  },
  error:{
    borderColor:'red',
  },
});

const TextInput = ({style, error, ...props}) => {
  const TextInputStyles =[
    styles.text,
    Platform.OS === 'android' && styles.android,
    Platform.OS === 'ios' && styles.ios,
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
