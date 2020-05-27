import { ACTION_TYPES } from "./types";
import { TCityWeatherInfo } from "../components/CityWeatherInfo/CityWeatherInfo";

interface ISetCurrentCityAction {
    type: typeof ACTION_TYPES.SET_CURRENTID,
    payload: number
};

interface IAddCityAction {
    type: typeof ACTION_TYPES.ADD_CITY,
    payload: TCityWeatherInfo
};

export type TCityActionTypes = ISetCurrentCityAction | IAddCityAction;

export const setCurrentId = ( id: number ): ISetCurrentCityAction => ({
    type: ACTION_TYPES.SET_CURRENTID,
    payload: id
});

export const addCity = ( cityWeatherInfo: TCityWeatherInfo ): IAddCityAction => ({
    type: ACTION_TYPES.ADD_CITY,
    payload: cityWeatherInfo
});
