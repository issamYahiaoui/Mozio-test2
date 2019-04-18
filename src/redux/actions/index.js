import {SET_RUNTIME_VARIABLE} from "../constants";

export const setRuntimeVariable = ({name,value}) => {
    return {
        type: SET_RUNTIME_VARIABLE,
        payload: {
            name,
            value,
        },
    };
}

export function fetchDistance({origins,destinations}) {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origins+"&destinations="+destinations+"&mode=driving&key=AIzaSyBYezs6ze6ZeaU7-tG0Cz-I6_1bd2U8eSc\n`


    console.log(url)
    return dispatch => {
        dispatch(setRuntimeVariable({
            name: 'fetchingDistanceStarted',
            value : true
        }));
        return fetch(url)
            .then(res => {
                console.log('fetched distance',res)
                 dispatch(setRuntimeVariable({
                     name:'distance',
                     value:res.json()
                 }));
                 dispatch(setRuntimeVariable({
                     name : 'fetchingDistanceStarted',
                     value:false
                 }));
                 return res.json()
            })
            .catch(error =>  dispatch(setRuntimeVariable({
                name:'fetchingDistanceFailed',
                value:true
            })))
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
