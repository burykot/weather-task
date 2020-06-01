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
        mock.onGet(/weather/).reply(200, getWeatherMock.correct);
        const result = getWeather('correct');

        return result.then(response => {
            expect(response.success).toEqual(true);
            expect(response.data.temperature).toEqual(306.22);
            expect(response.data.weatherConditions).toEqual('Clouds');
            expect(response.data.windSpeed).toEqual(1.57);
            expect(response.data.icon).toEqual('04d');
        })
    });

    it('404 shoud result in /not found/ message', () => {
        mock.onGet(/weather/)
            .reply(404, getWeatherMock.notFound);

        const result = getWeather('test');

        return result.then(response => {
            expect(response.success).toEqual(false);
            expect(response.data.message).toEqual('Location not found');
        })
    });

    it('should return an error on NerworkError', () => {
        mock.onGet(/weather/).networkError();

        const result = getWeather('irrelevant/url');
    
        return result.then(response => {
            expect(response.success).toEqual(false);
            expect(response.data.message).toEqual('There was an error, try again');
        })
    });
});
