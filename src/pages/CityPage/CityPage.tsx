import React from 'react';
import { withRouter } from 'react-router-dom';

import './CityPage.scss';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CurrentCityWeather } from '../../components/CurrentCityWeather/CurrentCityWeather';

const CityPage: React.FC = () => {

    return (
        <div className="citypage">
            <div className="citypage__search-form-wrapper">
                <h1 className="citypage__search-headline">Check weather</h1>
                <SearchForm />
            </div>
            <div className="citypage__results-wrapper">
                <div className="citypage__city-wrapper">
                    <CurrentCityWeather /> 
                </div>
                <div className="citypage__comparison-wrapper">
                    comparison
                </div>
            </div>
        </div>
    )
};

const CityPageWithRouter = withRouter(CityPage);

export { CityPageWithRouter };