import { SET_PLACES, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index'

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading())
        dispatch(authGetToken())
        .catch(() => {
            alert('No valid token found!')
        })
        .then(token => {
            authToken= token
            return fetch('https://us-central1-awesome-places-1533022190393.cloudfunctions.net/storeImage',{
                method: 'post',
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    "authorization": "Bearer "+ authToken
                }
            })
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong, plase try again')
            dispatch(uiStopLoading())
        })
        .then(res => res.json())
        .then(parsedRespons => {
            console.log('Updating Data');
            const placeData ={
                name: placeName,
                location: location,
                image: parsedRespons.imageUrl
            }
            
            return fetch('https://awesome-places-1533022190393.firebaseio.com/places.json?auth=' + authToken,{
                method: 'post',
                body: JSON.stringify(placeData)
            })
            .catch(err=> {
                console.log(err)
                alert('Something went wrong, plase try again')
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                dispatch(uiStopLoading())
            })
        })
       
    }
    
};

export const setPlaces = (places) => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const getPlaces = () => {
    return (dispatch, getState) => {
        dispatch(authGetToken())
        .catch(() => {
            alert('No valid token found!')
        })        
        .then(token => {
            return fetch('https://awesome-places-1533022190393.firebaseio.com/places.json?auth=' + token)
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places =[]
            
            for(let key in parsedRes){
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                })
            }
            
            dispatch(setPlaces(places))
        })
        
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
        .catch(() => {
            alert('No valid token found!')
        })        
        .then(token=> {
            return fetch(`https://awesome-places-1533022190393.firebaseio.com/places/${key}.json?auth=` + token,{
                method: 'delete',
            })
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(getPlaces())
        })
    }
};

