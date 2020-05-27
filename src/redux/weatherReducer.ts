import { TCityActionTypes } from "./actions"
import { TState, ACTION_TYPES } from './types'

const initialState: TState = {
    currentCityIndex: null,
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
        case ACTION_TYPES.SET_CURRENTID:
            return {
                ...state,
                currentCityIndex: action.payload
            }
        default:
            return state;
    }
}
