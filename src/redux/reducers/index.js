
import {SET_RUNTIME_VARIABLE} from '../constants'

export default function runtime(state = {

    startPoint : '' ,
    endPoint : '' ,
    passengersNb : 1 ,
    date : '2019-04-18' ,
    distance : null ,
    fetchingDistanceStarted :false ,
    fetchingDistanceFailed :  false ,
    origins : "" ,
    destinations : ""


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
