import React from 'react';
import ReactDOM from 'react-dom';
import { Provider }from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom';
import store from "./redux/store"
import Routers from './router/router';
import "./index.scss"
ReactDOM.render((
    <Router>
        <Provider store={store}>
            <Routers />
        </Provider>
    </Router>
    ),
    document.getElementById('root'));

