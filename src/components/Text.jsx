import React from 'react';
import { Text as NativeText, StyleSheet,Platform } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    fontFamily: theme.fonts.main,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextPrimary: {
    color: theme.colors.primary,
  },
  fontSizeTextSecondary: {
    fontSize: theme.fontSizes.subheading,
  },
  fontBoldText: {
    fontWeight:  theme.fontWeights.bold,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorTextError:{
    color:theme.colors.error,
  }


});
const Text = ({color, fontSize, fontWeight, style, ...props}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textPrimary' && styles.colorTextPrimary,
    color === 'textWhite' && styles.colorTextWhite,
    color === 'textError' && styles.colorTextError,
    fontSize === 'subheading' && styles.fontSizeTextSecondary,
    fontWeight === 'bold' && styles.fontBoldText,
    Platform.OS === 'android' && styles.fontFamily.andoid,
    Platform.OS === 'ios' && styles.fontFamily.ios,
    

    style,
  ];
  return <NativeText style={textStyle} {...props} />;
};

export default Text;
