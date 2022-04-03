export interface WeatherDataListModel {
  message: string;
  cod: string;
  count: number;
  list: WeatherModel[];
}
export interface WeatherModel {
  clouds: Clouds;
  coord: Coord;
  dt: number;
  id: number;
  main: Main;
  rain: number;
  snow: number;
  name: string;
  sys: Sys;
  unit?: string;
  weather: Weather[];
  wind: Wind;
}

export interface Clouds {
  all: number;
}
export interface Coord {
  lat: number;
  lon: number;
}

export interface Main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_min: number;
  temp_max: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Sys {
  country: string;
}

export interface Wind {
  speed: number;
  deg: number;
}
