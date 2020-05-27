import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getWeather } from './getWeather';
import { getWeatherMock } from './getWeather.mock';


describe('getWeather', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('should return an object with correct values', () => {

        mock.onGet('/weather')
            .reply(200, getWeatherMock.correct);

        const result = getWeather('correct');
    
        expect(result.success).toEqual(true);
        expect(result.data.temperature).toEqual(306.22);
        expect(result.data.weatherConditions).toEqual('Clouds');
        expect(result.data.windSpeed).toEqual(1.57);
        expect(result.data.icon).toEqual('04d');
    })

    it('404 shoud result in /not found/ message', () => {

        mock.onGet('/weather')
            .reply(404, getWeatherMock.notFound);

        const result = getWeather('test');
    
        expect(result.success).toEqual(false);
        expect(result.data.message).toEqual('City not found');
    })

    it('NetworkError should result in /error/ error', () => {

        mock.onGet('/weather').networkError();

        const result = getWeather('correct');
    
        expect(result.success).toEqual(false);
        expect(result.data.message).toEqual('There was an error, try again');
    })
})

