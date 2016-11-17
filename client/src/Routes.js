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
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';




export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/home" component={HomeBodyContainer} style={{height: "100%"}}/>
            <Route path="/home/:return" component={HomeBodyContainer} style={{height: "100%"}}/>
            <Route path="/article/:articleId" component={HomeBodyContainer} style={{height: "100%"}}/>
            <Route path="/userAccount" component={UserAccountBodyContainer}/>
            <Route path="/userAccount/:activeCollection" component={UserAccountBodyContainer}/>
            <Route path="/userAccount/:activeCollection/:articleId" component={UserAccountBodyContainer}/>
        </Route>
        <Route path="/" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
    </Router>
)
