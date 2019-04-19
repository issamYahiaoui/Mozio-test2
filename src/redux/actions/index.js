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



// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
