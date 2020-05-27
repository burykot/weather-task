import { TCityActionTypes } from "./actions"
import { TState, ACTION_TYPES } from './types'

const initialState: TState = {
    currentCity: null,
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
                currentCity: action.payload
            }
        case ACTION_TYPES.ADD_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.payload,
                cities: [
                    ...state.cities, action.payload
                ]
            }
        default:
            return state;
    }
}
