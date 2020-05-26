import React from 'react';
import './styles/App.scss';
import { Homepage } from './pages/Homepage/Homepage';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/:city">
                City
            </Route>
            <Route path="*">
                404
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
