import React from 'react';

import { OtherCityWeather } from '../OtherCityWeather/OtherCityWeather';

interface IWeatherComparison {
    currentCity: string;
}

export const WeatherComparison: React.FC<IWeatherComparison> = ({ currentCity }) => {
    const comparisonCities = ['Warszawa', 'Szczecin', 'Zakopane'].filter((comparCity: string) => currentCity.toLowerCase() !== comparCity.toLowerCase());

    return (
        <div className="weather-comparison">
            <h1 className="citypage__comparison-headline">Other cities</h1>
                    {comparisonCities.map((cityName, index) => {
                        return (
                            <OtherCityWeather
                                key={cityName.toLowerCase() + index}
                                city={cityName}
                            />
                        )
                    })}
        </div>
    )
};
