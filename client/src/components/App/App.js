import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../../history';

import SignIn from '../SignIn/SignIn';
import Main from '../Main/Main';
import Editor from '../Editor/Editor';
import NotFound from '../NotFound/NotFound';

import './App.css';

const App = ()=> {
    const pathsThatRenderMain = ["/", "/posts/:sortOrder", "/user/:userId", "/user/:userId/network/:network", "/post/:postId" ];
    const pathsThatRenderEditor = ["/editor", "/editor/:postId"];
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route exact path="/signin" component={SignIn}/>
                    <Route exact path={pathsThatRenderEditor} component={Editor}/>
                    <Route key={window.location.href} exact path={pathsThatRenderMain} component={Main}/>
                    <Route path='/' component={NotFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;