import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './CityPage.scss';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CurrentCityWeather } from '../../components/CurrentCityWeather/CurrentCityWeather';

interface ICityPage {
    city: string;
}

const CityP: React.FC<RouteComponentProps<ICityPage>> = ({ match }) => {
    const city = match.params.city;

    return (
        <div className="citypage">
            <div className="citypage__search-form-wrapper">
                <h1 className="citypage__search-headline">Check weather</h1>
                <SearchForm />
            </div>
            <div className="citypage__results-wrapper">
                <div className="citypage__city-wrapper">
                    <CurrentCityWeather city={city}/> 
                </div>
                <div className="citypage__comparison-wrapper">
                    comparison
                </div>
            </div>
        </div>
    )
};

export const CityPage = withRouter(CityP)