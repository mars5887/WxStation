// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/App'
import appStore from "./state";
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';


const appWithProvider = (
  <Provider store={appStore}>
    <App />
  </Provider>
);

ReactDOM.render(appWithProvider, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



console.log('process.env.VERSION', process.env.VERSION);
console.log('process.env.PLATFORM', process.env.PLATFORM);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);