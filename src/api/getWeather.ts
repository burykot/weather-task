import axios from 'axios';

interface IGetWeather {
    success: boolean,
    data: TWeatherInfo | TWeatherError
};

export type TWeatherInfo = {
    temperature: number;
    weatherConditions: string;
    windSpeed: number;
    icon: string;
};

export type TWeatherError = {
    message: string;
}

const getWeather = async ( cityName: string ): Promise<IGetWeather> => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`

    try {
        const response = await axios.get(url)
        return {
            success: true,
            data: {
                temperature: response.data.main.temp,
                weatherConditions: response.data.weather[0].main,
                windSpeed: response.data.wind.speed,
                icon: response.data.weather[0].icon
            }
        }
    } catch(error) {
        if (error.message.match('404')) {
            return {
                success: false,
                data: {
                    message: 'City not found'
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

export { getWeather };