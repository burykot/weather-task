import React from 'react';

import './CityWeatherInfo.scss'
import { TWeatherInfo } from '../../api/getWeather';
import { Spinner } from '../Spinner/Spinner';

export interface TCityWeatherInfo {
    city: string;
    weather?: TWeatherInfo
};

export const CityWeatherInfo: React.FC<TCityWeatherInfo> = ({ city, weather }) => {
    const cityName = city.replace(/(\b[a-z](?!\s))/g, (x: string) => x.toUpperCase())

    return (
        <div className="city-weather-info">
            <h2 className="city-weather-info__city-name">{cityName}</h2>
            {weather ? (
                <div className="city-weather-info__details-wrapper">
                    
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
};