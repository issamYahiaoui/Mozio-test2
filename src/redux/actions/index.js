import { SET_RUNTIME_VARIABLE } from "../constants";

export const setRuntimeVariable = ({ name, value }) => {
    return {
        type: SET_RUNTIME_VARIABLE,
        payload: {
            name,
            value
        }
    };
};

export function fetchDirections({googleService, origin , destination,travelMode }){
    return dispatch=>{
        dispatch(
            setRuntimeVariable({
                name: "fetchingDirectionsStarted",
                value: true
            })
        )
        googleService.route({
            origin: origin,
            destination: destination,
            travelMode: travelMode,
        }, (result, status) => {
            dispatch(
                setRuntimeVariable({
                    name: "fetchingDirectionsStarted",
                    value: false
                })
            )
            if (status === 'ÓK') {
                dispatch(
                    setRuntimeVariable({
                        name : 'directions',
                        value : result
                    })
                )
            } else {
                dispatch(
                    setRuntimeVariable({
                        name: "directionsError",
                        value: result

                    })
                )
            }
        });
    }
}


export function fetchDistanceDuration({googleService, origins, destinations,travelMode }){
    return dispatch=>{
        dispatch(
            setRuntimeVariable({
                name: "fetchingDistanceStarted",
                value: true
            })
        )
        return googleService.getDistanceMatrix(
            {
                origins: [origins],
                destinations: [destinations],
                travelMode: travelMode,
            }, (res,status)=>{
                dispatch(
                    setRuntimeVariable({
                        name: "fetchingDistanceDurationStarted",
                        value: false
                    })
                )

                console.log('res of fetch ...' , res )
                console.log('status of fetch ...' , status)
                if(status === 'OK'){
                   dispatch(
                       setRuntimeVariable({
                           name : 'distance',
                           value : res.rows[0].elements[0].distance
                       })
                   )
                    dispatch(
                        setRuntimeVariable({
                            name : 'duration',
                            value : res.rows[0].elements[0].duration
                        })
                    )
                }else{
                    dispatch(
                        setRuntimeVariable({
                            name: "distanceDurationError",
                            value: res

                        })
                    )
                }

            });
    }
}

