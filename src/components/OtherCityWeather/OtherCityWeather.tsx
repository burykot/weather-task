import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { TState } from '../../redux/types';
import './OtherCityWeather.scss';
import { getWeather, TWeatherInfo } from '../../api/getWeather';
import { getCelsiusFromKelvin } from '../../utils/getCelsiusFromKelvin';
import { addCity } from '../../redux/actions';
import { useCityData } from '../../utils/useCityData';

interface IOtherCityWeather {
    city: string;
};

export const OtherCityWeather: React.FC<IOtherCityWeather> = ({ city }) => {
    const [ temperatureDiff, setTemperatureDiff ] = useState(0);
    const [ windDiff, setWindDiff ] = useState(0);
    const dispatch = useDispatch();

    const searchedCity = useSelector((state: TState) => {
        return state.cities.find(city => city.cityId === state.currentCityId)
    });

    const { storedCity } = useCityData(city)

    const cancelTokenSource = Axios.CancelToken.source();
    useEffect(() => {
        if(!storedCity) {

            const fetchWeather = async () => {
                const result = await getWeather(city, cancelTokenSource);
                if(result.success) {
                    dispatch(addCity(city, result.data as TWeatherInfo))
                }
                // city will not be shown on error
            }
            fetchWeather();
        };

        if(storedCity && searchedCity ) {
            // set values of differences in weather
            setTemperatureDiff( getCelsiusFromKelvin(storedCity.weather.temperature) - getCelsiusFromKelvin(searchedCity.weather.temperature) )
            setWindDiff( +(storedCity.weather.windSpeed - searchedCity.weather.windSpeed).toFixed(2) )
        };

        return function cleanup() {
            cancelTokenSource.cancel();
        };
    }, [city, storedCity, searchedCity, cancelTokenSource, dispatch]);

    const temperatureDiffClassList = [
        'other-city-weather__temperature-differences',
        temperatureDiff && temperatureDiff > 0 ? 'other-city-weather__temperature-differences--hotter' : '',
        temperatureDiff && temperatureDiff < 0 ? 'other-city-weather__temperature-differences--colder' : ''
    ].join(' ');

    const windDiffClassList = [
        'other-city-weather__wind-differences',
        windDiff && windDiff > 0 ? 'other-city-weather__wind-differences--stronger' : '',
        windDiff && windDiff < 0 ? 'other-city-weather__wind-differences--weaker' : ''
    ].join(' ');

    return storedCity ? (
        <div className="other-city-weather">
            <div className="other-city-weather__label">{city}</div>
            <div className="other-city-weather__temperature">
                {getCelsiusFromKelvin(storedCity.weather.temperature)}ºC
                {temperatureDiff !== 0 && temperatureDiff && (
                    <div className={temperatureDiffClassList}>
                        {Math.abs(temperatureDiff)}º
                    </div>
                )}
            </div>
            <div className="other-city-weather__conditions">
                {storedCity.weather.weatherConditions}
            </div>
            <div className="other-city-weather__wind">
                {storedCity.weather.windSpeed}
                {windDiff !== 0 && windDiff && (
                    <div className={windDiffClassList}>
                        {Math.abs(windDiff)}
                    </div>
                )}
            </div>
        </div>
    ) : (
        null
    )
};
