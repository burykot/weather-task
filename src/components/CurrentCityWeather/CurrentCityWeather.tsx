import React from 'react';

import './CurrentCityWeather.scss'
import { getCelsiusFromKelvin } from '../../utils/getCelsiusFromKelvin';
import { TCityWeatherInfo } from '../../redux/types';

interface ICurrentCityWeather {
    cityWeather: TCityWeatherInfo;
}

export const CurrentCityWeather: React.FC<ICurrentCityWeather> = ({ cityWeather }) => {

    return (
        <div className="current-city-weather">
            <header className="current-city-weather__header">
                <h2 className="current-city-weather__city-name">
                    {cityWeather.city}
                </h2>
                <img className="current-city-weather__icon" alt="" src={`http://openweathermap.org/img/wn/${cityWeather.weather && cityWeather.weather.icon}@2x.png`} />
            </header>
            <div className="current-city-weather__details-wrapper">
                <div className="current-city-weather__label">Temperature</div>
                <div className="current-city-weather__value">
                    {cityWeather.weather && getCelsiusFromKelvin(cityWeather.weather.temperature)}ºC
                </div>
            </div>
            <div className="current-city-weather__details-wrapper">
                <div className="current-city-weather__label">Conditions</div>
                <div className="current-city-weather__value">
                    {cityWeather.weather && cityWeather.weather.weatherConditions}
                </div>
            </div>
            <div className="current-city-weather__details-wrapper">
                <div className="current-city-weather__label">Wind speed</div>
                <div className="current-city-weather__value">
                    {cityWeather.weather && cityWeather.weather.windSpeed}
                </div>
            </div>
        </div>
    )
};