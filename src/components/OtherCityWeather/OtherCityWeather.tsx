import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';

import { TState, ACTION_TYPES } from '../../redux/types';
import './OtherCityWeather.scss';
import { getWeather } from '../../api/getWeather';
import { getCelsiusFromKelvin } from '../../utils/getCelsiusFromKelvin';

interface IOtherCityWeather {
    city: string;
};

export const OtherCityWeather: React.FC<IOtherCityWeather> = ({ city }) => {
    const [ temperatureDiff, setTemperatureDiff ] = useState(0);
    const [ windDiff, setWindDiff ] = useState(0);
    const dispatch = useDispatch();

    const storedCities = useSelector((state: TState) => {
        return {
            searched: state.currentCity,
            thisCity: state.cities.find(element => element.city.toLowerCase() === city.toLowerCase())
        }
    })

    const cancelTokenSource = Axios.CancelToken.source();
    useEffect(() => {
        if(!storedCities.thisCity && storedCities.searched) {
            const fetchWeather = async () => {
                const result = await getWeather(city, cancelTokenSource);
                if(result.success) {
                    dispatch({
                        type: ACTION_TYPES.ADD_CITY,
                        payload: {
                            city: city,
                            weather: {...result.data}
                        }
                    })
                }
                // city will not be shown on error
            }
            fetchWeather();
        };

        if(storedCities.thisCity && storedCities.searched) {
            // set values of differences in weather
            const thisCityWeather = storedCities.thisCity.weather;
            const searchedCityWeather = storedCities.searched.weather;

            setTemperatureDiff( getCelsiusFromKelvin(thisCityWeather.temperature) - getCelsiusFromKelvin(searchedCityWeather.temperature) )
            setWindDiff( +(thisCityWeather.windSpeed - searchedCityWeather.windSpeed).toFixed(2) )
        };

        return function cleanup() {
            cancelTokenSource.cancel();
        };
    }, [city, storedCities.searched, storedCities.thisCity, cancelTokenSource, dispatch]);

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

    return storedCities.thisCity ? (
        <div className="other-city-weather">
            <div className="other-city-weather__label">{city}</div>
            <div className="other-city-weather__temperature">
                {getCelsiusFromKelvin(storedCities.thisCity.weather.temperature)}ºC
                {temperatureDiff !== 0 && temperatureDiff && (
                    <div className={temperatureDiffClassList}>
                        {Math.abs(temperatureDiff)}º
                    </div>
                )}
            </div>
            <div className="other-city-weather__conditions">
                {storedCities.thisCity.weather.weatherConditions}
            </div>
            <div className="other-city-weather__wind">
                {storedCities.thisCity.weather.windSpeed}
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
