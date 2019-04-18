import { createStore, combineReducers , applyMiddleware, } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import runtimeReducer from './reducers'
import thunk from 'redux-thunk';
const rootReducer =(history)=> combineReducers({
    router: connectRouter(history),
    root : runtimeReducer
});
export const history = createBrowserHistory()

export function configureStore() {
    const store = createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history) ,
                thunk
               ),
        ))
    return store;
}
