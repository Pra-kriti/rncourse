import React from 'react';
import { Text, StyleSheet } from 'react-native'

const HeadingText = (props) => {
  return (
    <Text 
      {...props} 
      style={[styles.textHeading, props.style]}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textHeading:{
    fontSize: 28,
    fontWeight: "600"
  },
})

export default HeadingText;
