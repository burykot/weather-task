import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './styles/App.scss';
import { Homepage } from './pages/Homepage/Homepage';
import { CityPage } from './pages/CityPage/CityPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { weatherReducer } from './redux/weatherReducer';

export const store = createStore(weatherReducer, composeWithDevTools())

function App() {
  return (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/404">
                    <NotFoundPage />
                </Route>
                <Route exact path="/:city">
                    <CityPage />
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
