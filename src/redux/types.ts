import { TCityWeatherInfo } from "../components/CityWeatherInfo/CityWeatherInfo";

export enum ACTION_TYPES {
    SET_CURRENTID,
    ADD_CITY
};

export type TState = {
    currentCityIndex: number | null,
    cities: TCityWeatherInfo[]
};
