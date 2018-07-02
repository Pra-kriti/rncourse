import React from 'react'

import DefaultInput from '../UI/DefaultInput/DefaultInput'

const  PlaceInput = props => {
  return (
    <DefaultInput 
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onChangeText}
    />
  );
}

export default PlaceInput
