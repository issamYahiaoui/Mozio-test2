
import {SET_RUNTIME_VARIABLE} from '../constants'

export default function runtime(state = {

    startPoint : '' ,
    endPoint : '' ,
    passengersNb : 1 ,
    date : '2019-04-18' ,
    distance : null ,
    duration : null ,
    directions : null ,
    fetchingDistanceDurationStarted :false ,
    distanceDurationError :  null ,
    fetchingDirectionsStarted :false ,
    directionsError :  null ,
    origins : null ,
    destinations : null,
    travelMode : 'DRIVING'


}, action) {
    switch (action.type) {
        case SET_RUNTIME_VARIABLE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };

        default:
            return state;
    }
}
