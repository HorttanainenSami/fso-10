import React from 'react';
import { View } from 'react-native';
import Text from './Text';

function abbreviateNumber(number){

    var tier = number/1000;
    // if zero, we don't need a suffix
    if(Math.floor(tier) === 0) return number;

    // format number and add suffix
    return Number(tier.toFixed(1)) + 'k';
}
const CountAndDescription = ({count, text}) => {
    const number = abbreviateNumber(count);
    return(
    <View style = {{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
       <Text>{number}</Text>
      <Text> {text} </Text> 
    </View>);

};

export default CountAndDescription;
