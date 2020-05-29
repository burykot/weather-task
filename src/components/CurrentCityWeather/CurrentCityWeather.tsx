import React, { useEffect, useState } from 'react';

import './CurrentCityWeather.scss'
import { Spinner } from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { TState, ACTION_TYPES } from '../../redux/types';
import { getWeather, TWeatherError } from '../../api/getWeather';
import { useHistory } from 'react-router-dom';

interface ICurrentCityWeather {
    city: string;
}

export const CurrentCityWeather: React.FC<ICurrentCityWeather> = ({ city }) => {
    const [ errorMsg, setErrorMsg ] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const currentCity = useSelector((state: TState) => state.currentCity);

    useEffect(() => {
        if(!currentCity) {
            const fetchWeather = async () => {
                const result = await getWeather(city);
                if(result.success) {
                    dispatch({
                        type: ACTION_TYPES.ADD_CURRENT_CITY,
                        payload: {
                            city: city,
                            weather: {...result.data}
                        }
                    })
                } else {
                    const error = (result.data as TWeatherError);
                    if(error.code === 404) {
                        history.push('/404')
                    }
                    setErrorMsg( `${error.message}` )
                }
            }
            fetchWeather()
        };
    }, [currentCity, city]);

    return (
        <div className="current-city-weather">
            {currentCity ? (
                <>
                    <header className="current-city-weather__header">
                        <h2 className="current-city-weather__city-name">
                            {currentCity.city}
                        </h2>
                        <img className="current-city-weather__icon" alt="" src={`http://openweathermap.org/img/wn/${currentCity.weather && currentCity.weather.icon}@2x.png`} />
                    </header>
                    <div className="current-city-weather__details-wrapper">
                        <div className="current-city-weather__label">Temperature</div>
                        <div className="current-city-weather__value">
                            {currentCity.weather && Math.round(currentCity.weather.temperature - 273.15)}C
                        </div>
                    </div>
                    <div className="current-city-weather__details-wrapper">
                        <div className="current-city-weather__label">Conditions</div>
                        <div className="current-city-weather__value">
                            {currentCity.weather && currentCity.weather.weatherConditions}
                        </div>
                    </div>
                    <div className="current-city-weather__details-wrapper">
                        <div className="current-city-weather__label">Wind speed</div>
                        <div className="current-city-weather__value">
                            {currentCity.weather && currentCity.weather.windSpeed}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    { !errorMsg && <Spinner /> }
                </>
            )}
            {errorMsg && <div className="current-city-weather__error">
                {errorMsg}
            </div>}
        </div>
    )
};