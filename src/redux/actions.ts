import { ACTION_TYPES, TCityWeatherInfo } from "./types";

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
