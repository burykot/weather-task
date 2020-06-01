import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import './CityPage.scss';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { CurrentCityWeather } from '../../components/CurrentCityWeather/CurrentCityWeather';
import { WeatherComparison } from '../../components/WeatherComparison/WeatherComparison';
import { TState } from '../../redux/types';
import { getWeather, TWeatherError, TWeatherInfo } from '../../api/getWeather';
import { setCurrentCity, addCurrentCity } from '../../redux/actions';

interface ICityPage {
    city: string;
}

const CityP: React.FC<RouteComponentProps<ICityPage>> = ({ match }) => {
    const city = match.params.city;
    const [ errorMsg, setErrorMsg ] = useState('');
    const dispatch = useDispatch();
    const storedCity = useSelector((state: TState) => {
        return state.cities.find(element => element.city.toLowerCase() === city.toLowerCase())
    });

    const cancelTokenSource = Axios.CancelToken.source();
    useEffect(() => {
        if(storedCity) {
            setErrorMsg('');
            dispatch(setCurrentCity(storedCity));
        } else {
            const fetchWeather = async () => {
                const result = await getWeather(city, cancelTokenSource);
                if(result.success) {
                    setErrorMsg('');
                    dispatch(addCurrentCity(city, result.data as TWeatherInfo));
                } else {
                    const error = (result.data as TWeatherError);
                    setErrorMsg(error.message);
                }
            };
            fetchWeather();
        };

        return function cleanup() {
            cancelTokenSource.cancel();
        };
    }, [city, cancelTokenSource, dispatch, storedCity]);

    return (
        <div className="citypage">
            <div className="citypage__search-form-wrapper">
                <SearchForm />
            </div>
            { storedCity && errorMsg.length === 0 ? (
                <div className="citypage__results-wrapper">
                    <div className="citypage__city-wrapper">
                        <CurrentCityWeather cityWeather={storedCity}/> 
                    </div>
                    <div className="citypage__comparison-wrapper">
                        <WeatherComparison currentCity={city} />
                    </div>
                </div>
            ) : (
                <div className="citypage__error">{errorMsg}</div>
            )}
        </div>
    )
};

export const CityPage = withRouter(CityP)