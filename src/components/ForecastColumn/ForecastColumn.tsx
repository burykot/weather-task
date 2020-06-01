import React from 'react';

import { TWeatherInfo } from "../../api/getWeather"
import './ForecastColumn.scss';
import { getCelsiusFromKelvin } from '../../utils/getCelsiusFromKelvin';

interface IForecastColumn {
    weatherInfo: TWeatherInfo
};

export const ForecastColumn: React.FC<IForecastColumn> = ({ weatherInfo }) => {

    return (
        <div className="forecast-column">
            <div className="forecast-column__icon">
                <img
                    className="current-city-weather__icon"
                    alt=""
                    src={`http://openweathermap.org/img/wn/${weatherInfo.icon && weatherInfo.icon}@2x.png`}
                />
            </div>
            <div className="forecast-column__temperature">{getCelsiusFromKelvin(weatherInfo.temperature)}ºC</div>
            <div className="forecast-column__conditions">{weatherInfo.weatherConditions}</div>
            <div className="forecast-column__wind">{weatherInfo.windSpeed}</div>
        </div>
    )
}
