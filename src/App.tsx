import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import './styles/App.scss';
import { Homepage } from './pages/Homepage/Homepage';
import { CityPageWithRouter } from './pages/CityPage/CityPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { weatherReducer } from './redux/weatherReducer';

const store = createStore(weatherReducer)

function App() {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/:city">
                    <CityPageWithRouter />
                </Route>
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </Router>
    </Provider>
  );
}

export default App;
