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

export function fetchDistance({ origins, destinations }) {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origins+"&destinations="+destinations+"&mode=driving&key=AIzaSyDdfGGp_xZc9P1kGN3e8UAcIBHHNuJ4IWc\n`;

    console.log(url);
    return dispatch => {
        dispatch(
            setRuntimeVariable({
                name: "fetchingDistanceStarted",
                value: true
            })
        );
        return fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log("fetched distance", json);
                dispatch(
                    setRuntimeVariable({
                        name: "distance",
                        value: json
                    })
                );
                dispatch(
                    setRuntimeVariable({
                        name: "fetchingDistanceStarted",
                        value: false
                    })
                );
                return json;
            })
            .catch(error => {
                console.log("error  when fetching sitance", error);
                dispatch(
                    setRuntimeVariable({
                        name: "fetchingDistanceFailed",
                        value: true
                    })
                );
            });
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
