import { TWeatherInfo } from "../api/getWeather";

export enum ACTION_TYPES {
    ADD_CITY = "ADD_CITY",
    ADD_CURRENT_CITY = "ADD_CURRENT_CITY",
    SET_CURRENT_CITY = "SET_CURRENT_CITY",
    ADD_FORECAST = "ADD_FORECAST"
};

export type TCityWeatherInfo = {
    city: string;
    cityId: number,
    weather: TWeatherInfo;
    forecast?: TWeatherInfo[];
};

export type TState = {
    currentCityId: number | null;
    cities: TCityWeatherInfo[];
};
