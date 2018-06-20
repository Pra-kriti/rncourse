import React, { Component } from 'react'

import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class PlaceInput extends Component {
  state={
    placeName:null
  }

  placeNameChangedHandler = (placeName) => {
    this.setState({ placeName })
  }

  addPlaceHandler = () => {
    this.props.onAddPlace(this.state.placeName)
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='An awesome place'
          value={this.state.placeName} 
          onChangeText={this.placeNameChangedHandler} 
          style={styles.placeInput}
        />
        <Button 
          title='Add'
          style={styles.placeButton}
          onPress={this.addPlaceHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    // flex:1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
});
