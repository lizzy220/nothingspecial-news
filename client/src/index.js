/* eslint no-unused-vars: "off" */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Root from './Root';
import Foo from './Foo';
import MainLayout from './MainLayout';
import {HomeBodyContainer,UserAccountBodyContainer} from './BodyContainer';
import './index.css';
import '../../semantic/dist/semantic.min.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Routes from './Routes';
import setAuthorizationToken from './setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './login'



const store = createStore(

  (state = {}) => state,
  applyMiddleware(thunk)
);

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>, document.getElementById('root'));
