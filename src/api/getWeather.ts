interface IGetWeather {
    success: boolean,
    data: TWeatherInfo
};

export type TWeatherInfo = {
    temperature: number;
    weatherConditions: number;
    windStrength: number;
};

const getWeather = ( cityName: string ): IGetWeather => {

    return {
        success: true,
        data: {
            temperature: 15,
            weatherConditions: 210,
            windStrength: 20
        }
    }
};

export { getWeather };