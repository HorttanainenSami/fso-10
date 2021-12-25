import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';

function abbreviateNumber(number){

    var tier = number/1000;
    // if zero, we don't need a suffix
    if(Math.floor(tier) === 0) return number;

    // format number and add suffix
    return Number(tier.toFixed(1)) + 'k';
}
const CountAndDescription = ({count, text, testID} ) => {
    const number = abbreviateNumber(count);
    return(
    <View style = {{flexDirection:'column', alignItems: 'center'}} >
      <Text testID={`${testID}count`}>
        {number}
      </Text>
      <Text testID={`${testID}text`}>
        {text}
      </Text> 
    </View>);

};

export default CountAndDescription;
