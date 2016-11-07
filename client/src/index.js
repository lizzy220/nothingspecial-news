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



const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);
// see https://github.com/ReactTraining/react-router
render((
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={HomeBodyContainer}/>
      <Route path="/userAccount" component={UserAccountBodyContainer}/>
    </Route>
  </Router>
), document.getElementById('root'))
