import React from 'react';
import theme from '../theme';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';

const styles = StyleSheet.create({
  grid : {
    display:'grid',
    gridTemplateRows:"auto auto auto",
    gridTemplateColumns: "80px auto",
    gridRowGap: 5,
    padding: 5,
  },
  reviewSymbol: {
    gridRowStart: '1',
    gridRowEnd: '4',
    color: theme.colors.primary,
    borderColor:theme.colors.primary,
    paddingTop: 20,
    margin: 5,
    borderWidth: 2,
    borderRadius: '50%',
    width: 60,
    height: 60,
    textAlign: 'center',
  },
  date: {
    color: theme.colors.buttonPrimary,
  },

});
const Review = ({ rating, header, date, text, style}) => {
  const initialStyle = [styles.grid, style];
  return( 
    <View style={initialStyle}>
      <Text fontWeight='bold' style={styles.reviewSymbol}>
        {rating}
      </Text>
      <Text fontWeight='bold'>
        {header}
      </Text>
      <Text style={styles.date}>
        {format( new Date(date), 'dd/MM/yyyy') }
      </Text>
      <Text>
        {text}
      </Text>
    </View>
  );
};


export default Review;
