
import {SET_RUNTIME_VARIABLE} from '../constants'

export default function runtime(state = {

    startPoint : null ,
    endPoint : null ,
    passengersNb : null ,
    date : '2019-04-18' ,
    distance : null ,


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
