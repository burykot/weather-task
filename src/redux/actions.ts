import { ACTION_TYPES, TCityWeatherInfo } from "./types";
import { TWeatherInfo } from "../api/getWeather";

interface IAddCityAction {
    type: typeof ACTION_TYPES.ADD_CITY,
    payload: TCityWeatherInfo
};

interface ISetCurrentCityAction {
    type: typeof ACTION_TYPES.SET_CURRENT_CITY,
    payload: TCityWeatherInfo
};

interface IAddCurrentCityAction {
    type: typeof ACTION_TYPES.ADD_CURRENT_CITY,
    payload: TCityWeatherInfo
};

export type TCityActionTypes = IAddCityAction | ISetCurrentCityAction | IAddCurrentCityAction;

export const setCurrentCity = (payload: TCityWeatherInfo) => {
    return {
        type: ACTION_TYPES.SET_CURRENT_CITY,
        payload: { ...payload }
    }
}

export const addCurrentCity = (city: string, weatherInfo: TWeatherInfo) => {
    return {
        type: ACTION_TYPES.ADD_CURRENT_CITY,
        payload: {
            city: city,
            weather: {...weatherInfo}
        }
    }
}

export const addCity = (city: string, weatherInfo: TWeatherInfo) => {
    return {
        type: ACTION_TYPES.ADD_CITY,
        payload: {
            city: city,
            weather: {...weatherInfo}
        }
    }
}