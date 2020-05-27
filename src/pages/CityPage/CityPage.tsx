import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './CityPage.scss';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { getWeather } from '../../api/getWeather';
import { CityWeatherInfo } from '../../components/CityWeatherInfo/CityWeatherInfo';
import { TState } from '../../redux/types';

type ICitypageParams = {
    city: string
};

type ICityPage = RouteComponentProps<ICitypageParams>

const CityPage: React.FC<ICityPage> = ( { match } ) => {
    const city = match.params.city;
    const currentCityIndex = useSelector((state: TState) => state.currentCityIndex)

    const response = getWeather(city);


    return (
        <div className="citypage">
            <div className="citypage__search-form-wrapper">
                <h1 className="citypage__search-headline">Szukaj miasta</h1>
                <SearchForm />
            </div>
            <div className="citypage__results-wrapper">
                <div className="citypage__city-wrapper">
                    <CityWeatherInfo
                        city={city}
                    /> 
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