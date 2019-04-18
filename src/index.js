import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./redux/store";
import App from "./containers/App";
ReactDOM.render(

    <Provider store={configureStore()}>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQfrejthnm4WMYdrrxYh6YBn0R6-7OQQM&libraries=places" />
        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
