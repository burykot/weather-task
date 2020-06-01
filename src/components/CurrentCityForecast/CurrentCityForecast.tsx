import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

import './CurrentCityForecast.scss';
import { ForecastColumn } from '../ForecastColumn/ForecastColumn';
import { getForecast } from '../../api/getForecast';
import { TWeatherInfo } from '../../api/getWeather';
import { addForecast } from '../../redux/actions';
import { useCityData } from '../../utils/useCityData';

interface ICurrentCityForecast {
    city: string
};

export const CurrentCityForecast: React.FC<ICurrentCityForecast> = ({ city }) => {
    const dispatch = useDispatch();

    const { storedCityId, storedCity } = useCityData(city);

    const cancelTokenSource = Axios.CancelToken.source();
    useEffect(() => {
        const fetchForecast = async () => {
            if(storedCity && !storedCity.forecast) {
                const response = await getForecast(city, cancelTokenSource)
                if(response.success && storedCityId) {
                    dispatch(addForecast(storedCityId, (response.data as TWeatherInfo[]) ));
                }
            }
        }
        fetchForecast();

        return function cleanup() {
            cancelTokenSource.cancel();
        }
    }, [city, storedCity, dispatch, storedCityId, cancelTokenSource ]);


    return (
        <div className="current-city-forecast">
            <h2 className="current-city-forecast__headline">
                Next 2 days:
            </h2>
            <div className="current-city-forecast__data-wrapper">
                <div className="current-city-forecast__labels">
                    <div className="current-city-forecast__label">Temperature</div>
                    <div className="current-city-forecast__label">Conditions</div>
                    <div className="current-city-forecast__label">Wind Speed</div>
                </div>
                <div className="current-city-forecast__data">
                    {storedCity && storedCity.forecast &&
                            storedCity.forecast.map((weather: TWeatherInfo, index) => (
                                <ForecastColumn
                                    key={storedCity.city + index}
                                    weatherInfo={weather}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}