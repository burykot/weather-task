import { TWeatherInfo } from "../api/getWeather";

export enum ACTION_TYPES {
    ADD_CITY = "ADD_CITY",
    ADD_CURRENT_CITY = "ADD_CURRENT_CITY",
    SET_CURRENT_CITY = "SET_CURRENT_CITY"
};

export type TCityWeatherInfo = {
    city: string;
    weather: TWeatherInfo
};

export type TState = {
    currentCity: TCityWeatherInfo | null;
    cities: TCityWeatherInfo[];
};
