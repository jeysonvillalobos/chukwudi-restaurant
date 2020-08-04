import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Home from './Pages/Home';

const Router = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path='/' exact component={ Home } />
        </Switch>
    </BrowserRouter>
);

export default Router;