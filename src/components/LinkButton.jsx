import React from 'react';
import Button from './Button';
import * as WebBrowser from 'expo-web-browser';


const LinkButton = ({link, ...props}) => {

  const handlePress = () => WebBrowser.openBrowserAsync(link);

  return (
    <Button handlePress={handlePress} {...props} />
  );
};

export default LinkButton;
