import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  button: theme.button,
});
const Button = ({handlePress, text, style}) => {
  const initialStyle = [styles.button, style];
  return(
    <Pressable style={initialStyle} onPress={handlePress}>
    <Text color='textWhite'>
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
