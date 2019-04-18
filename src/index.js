import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import {configureStore} from "./redux/store";
import App from "./containers/App";
ReactDOM.render(

    <Provider store={configureStore()}>

        <App />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
