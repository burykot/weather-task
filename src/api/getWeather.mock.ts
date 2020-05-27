export const getWeatherMock = {
    correct: {"coord":{"lon":4.42,"lat":9.9},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":306.22,"feels_like":308.26,"temp_min":306.22,"temp_max":306.22,"pressure":1012,"humidity":43,"sea_level":1012,"grnd_level":984},"wind":{"speed":1.57,"deg":193},"clouds":{"all":57},"dt":1590744022,"sys":{"country":"NG","sunrise":1590729623,"sunset":1590775170},"timezone":3600,"id":2319078,"name":"Wawa","cod":200},
    notFound: {"cod":"404","message":"city not found"}
}