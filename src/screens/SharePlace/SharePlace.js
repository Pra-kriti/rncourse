import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'

class SharePlace extends Component {
  state ={
    placeName: ""
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = (event) => {
    if(event.type==="NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }

  placeAddedHandler = () => {
    if(this.state.placeName.trim() !== ""){
      this.props.onAddPlace(this.state.placeName)
    }
  }

  placeNameChangeHandler = (val) => {
    this.setState({ placeName: val})
  }

  render() {
    return (
      <ScrollView >
        <View style={styles.container}>
          <MainText>
            <HeadingText>
              Share a place with us!
            </HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput 
            placeName={this.state.placeName} 
            onChangeText={this.placeNameChangeHandler}
          />
          <View style={styles.button}>
            <Button 
              title="Share the place" 
              onPress={this.placeAddedHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button:{
    margin: 8
  },
  previewImage:{ 
    height: "100%",
    width: "100%"

  }
})

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlace);
