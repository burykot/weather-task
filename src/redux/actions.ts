import { ACTION_TYPES, TCityWeatherInfo } from "./types";
import { TWeatherInfo } from "../api/getWeather";

interface IAddCityAction {
    type: typeof ACTION_TYPES.ADD_CITY;
    payload: TCityWeatherInfo;
};

interface ISetCurrentCityAction {
    type: typeof ACTION_TYPES.SET_CURRENT_CITY;
    payload: number;

};

interface IAddCurrentCityAction {
    type: typeof ACTION_TYPES.ADD_CURRENT_CITY;
    payload: TCityWeatherInfo;
};

interface IAddForecast {
    type: typeof ACTION_TYPES.ADD_FORECAST;
    payload: {
        cityId: number,
        forecast: TWeatherInfo[];
    }
};

export type TCityActionTypes = IAddCityAction | ISetCurrentCityAction | IAddCurrentCityAction | IAddForecast;

export const setCurrentCity = (cityId: number) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_CITY,
        payload: cityId
    }
};

export const addCurrentCity = (city: string, weatherInfo: TWeatherInfo) => {
    return {
        type: ACTION_TYPES.ADD_CURRENT_CITY,
        payload: {
            city: city,
            cityId: weatherInfo.cityId,
            weather: {...weatherInfo}
        }
    }
};

export const addCity = (city: string, weatherInfo: TWeatherInfo) => {
    return {
        type: ACTION_TYPES.ADD_CITY,
        payload: {
            city: city,
            cityId: weatherInfo.cityId,
            weather: {...weatherInfo}
        }
    }
};

export const addForecast = (cityId: number, forecast: TWeatherInfo[]) => {
    return {
        type: ACTION_TYPES.ADD_FORECAST,
        payload: {
            cityId: cityId,
            forecast: forecast
        }
    }
};