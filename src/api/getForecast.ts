import axios, { CancelTokenSource } from 'axios';
import { TWeatherInfo, TWeatherError } from './getWeather';

interface IGetForecast {
    success: boolean,
    data: TWeatherInfo[] | TWeatherError
};

interface IForecastAPI {
    city: {
        id: number
    },
    list: TForecastAPIDataPoint[]
}

type TForecastAPIDataPoint = {
    main: {
        temp: number
    },
    weather: {
        main: string,
        icon: string
    }[],
    wind: {
        speed: number
    }
};

export const getForecast = async ( cityName: string, cancelTokenSource?: CancelTokenSource ): Promise<IGetForecast> => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`

    const getWeatherDataPoints = (data: IForecastAPI, points: number[]) => {
        return points.map(point => {
            return {
                cityId: data.city.id,
                temperature: data.list[point].main.temp,
                weatherConditions: data.list[point].weather[0].main,
                windSpeed: data.list[point].wind.speed,
                icon: data.list[point].weather[0].icon
            }
        })
    }

    try {
        const response = await axios.get(url, {cancelToken: cancelTokenSource?.token})
        return {
            success: true,
            data: getWeatherDataPoints((response.data as IForecastAPI), [8, 16])
        }
    } catch(error) {
        if (error.message && error.message.match('404')) {
            return {
                success: false,
                data: {
                    message: 'Location not found',
                    code: 404
                }
            }
        } else {
            return {
                success: false,
                data: {
                    message: 'There was an error, try again'
                }}
        }
    }
};