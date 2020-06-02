import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { getWeather } from './getWeather';
import { getForecast } from './getForecast';
import { getForecastMock } from './getForecast.mock';

describe('getWeather', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('should return an object with correct values', () => {
        mock.onGet(/forecast/).reply(200, getForecastMock.correct);
        const response = getForecast('correct');

        return response.then(result => {
            expect(result.success).toEqual(true);
            expect(result.data[0].temperature).toEqual(285.79);
            expect(result.data[0].weatherConditions).toEqual('Clouds');
            expect(result.data[0].windSpeed).toEqual(3.32);
            expect(result.data[0].icon).toEqual('03d');
        })
    });

    it('404 shoud result in /not found/ message', () => {
        mock.onGet(/forecast/)
            .reply(404, getForecastMock.notFound);

        const response = getWeather('test');

        return response.then(result => {
            expect(result.success).toEqual(false);
            expect(result.data.message).toEqual('Location not found');
        })
    });
});
