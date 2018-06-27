import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initalState = {
  places: []
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(), 
          name: action.placeName,
          image: {
            uri: "https://www.pandotrip.com/wp-content/uploads/2016/02/Rio3-1-980x699.jpg"
          }
        })
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place=> {
          return place.key !== action.placeKey
        })
      }
    default:
      return state;
  }
}

export default reducer
