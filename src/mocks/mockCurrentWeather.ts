import { WeatherModel, WeatherDataListModel } from '../app/model/weather.model';

export const mockCurrentWeather: WeatherModel = {
  clouds: { all: 0 },
  coord: { lat: 60.1695, lon: 24.9355 },
  dt: 1648937345,
  id: 658225,
  main: {
    feels_like: -6.89,
    humidity: 66,
    pressure: 1008,
    temp: -3.1,
    temp_max: -1.61,
    temp_min: -6.24,
  },
  rain: 0,
  snow: 0,
  name: 'Helsinki',
  sys: { country: 'FI' },
  unit: 'metric',
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01n',
    },
  ],
  wind: { speed: 2.68, deg: 265 },
};

export const mockWeatherData: WeatherDataListModel = {
  message: 'accurate',
  cod: '200',
  count: 3,
  list: [
    {
      id: 1138957,
      name: 'Wilāyat-e Kābul',
      coord: {
        lat: 34.5,
        lon: 69.4167,
      },
      main: {
        feels_like: 281.6,
        pressure: 1018,
        humidity: 34,
        temp: 282.75,
        temp_min: 282.75,
        temp_max: 282.75,
      },
      dt: 1648944336,
      wind: {
        speed: 2.36,
        deg: 246,
      },
      sys: {
        country: 'AF',
      },
      rain: 0,
      snow: 0,
      clouds: {
        all: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
    },
    {
      id: 1138958,
      name: 'Kabul',
      coord: {
        lat: 34.5281,
        lon: 69.1723,
      },
      main: {
        temp: 282.93,
        feels_like: 282.93,
        temp_min: 282.93,
        temp_max: 282.93,
        pressure: 1018,
        humidity: 37,
      },
      dt: 1648944543,
      wind: {
        speed: 0.71,
        deg: 244,
      },
      sys: {
        country: 'AF',
      },
      rain: 0,
      snow: 0,
      clouds: {
        all: 0,
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
    },
    {
      id: 294615,
      name: 'Kābūl',
      coord: {
        lat: 32.8667,
        lon: 35.2131,
      },
      main: {
        temp: 291.67,
        feels_like: 290.47,
        temp_min: 291.67,
        temp_max: 291.67,
        pressure: 1014,
        humidity: 34,
      },
      dt: 1648944550,
      wind: {
        speed: 1.4,
        deg: 331,
      },
      sys: {
        country: 'IL',
      },
      rain: 0,
      snow: 0,
      clouds: {
        all: 100,
      },
      weather: [
        {
          id: 804,
          main: 'clouds',
          description: 'overcast clouds',
          icon: '04n',
        },
      ],
    },
  ],
};
