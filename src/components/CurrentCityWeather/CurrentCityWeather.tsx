import React from 'react';

import './CurrentCityWeather.scss'
import { Spinner } from '../Spinner/Spinner';
import { useSelector } from 'react-redux';
import { TState } from '../../redux/types';

export const CurrentCityWeather: React.FC = () => {
    const currentCity = useSelector((state: TState) => state.currentCity)

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
                <Spinner />
            )}
        </div>
    )
};