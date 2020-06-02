import { TCityActionTypes } from "./actions"
import { TState, ACTION_TYPES, TCityWeatherInfo } from './types'

const initialState: TState = {
    currentCityId: null,
    cities: []
}

export const weatherReducer = (state = initialState, action: TCityActionTypes): TState => {
    switch (action.type) {
        case ACTION_TYPES.ADD_CITY:
            return {
                ...state,
                cities: [
                    ...state.cities, action.payload
                ]
            }
        case ACTION_TYPES.SET_CURRENT_CITY:
            return {
                ...state,
                currentCityId: action.payload
            }
        case ACTION_TYPES.ADD_CURRENT_CITY:
            return {
                ...state,
                currentCityId: action.payload.cityId,
                cities: [
                    ...state.cities, action.payload
                ]
            }
        case ACTION_TYPES.ADD_FORECAST:
            const storedCity = state.cities.find(element => element.cityId === action.payload.cityId)
            const newCity = {...storedCity as TCityWeatherInfo}
            
            if(newCity){
                newCity.forecast = action.payload.forecast

                return {
                    ...state,
                    cities: [
                        ...state.cities.filter((element) => element.cityId !== action.payload.cityId),
                        newCity
                    ]
                }
            }
            return {
                ...state,
            }
        default:
            return state;
    }
}
