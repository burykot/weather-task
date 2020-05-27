import { getWeather } from './getWeather'
;
test('Should return an object with correct values', () => {
    const result = getWeather('test')

    expect(result.success).toEqual(true);
    expect(result.data.temperature).toEqual(15);
    expect(result.data.weatherConditions).toEqual(210);
    expect(result.data.windStrength).toEqual(20);
})
