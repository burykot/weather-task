import { useSelector } from 'react-redux';
import { TState } from '../redux/types';

export const useCityData = (city: string) => {
    const storedCityId = useSelector((state: TState) => {
        const tempCity = state.cities.find(element => {
            if(element.city.toLowerCase() === city.toLowerCase()) {
                return element.cityId
            }
            return null
        })
        return tempCity?.cityId
    });
    const storedCity = useSelector((state: TState) => {
        if(storedCityId) {
            return state.cities.find(element => element.cityId === storedCityId)
        }
    });

    return {
        storedCityId: storedCityId,
        storedCity: storedCity
    }
}