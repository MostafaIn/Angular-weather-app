import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ForecastService } from './forecast.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  mockCurrentWeather,
  mockWeatherData,
} from 'src/mocks/mockCurrentWeather';
import { environment } from '../environments/environment';

describe('forecast service', () => {
  let forecastService: ForecastService;
  let http: HttpClient;
  let httpController: HttpTestingController;
  let url = 'http://localhost:4200/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForecastService],
    });

    forecastService = TestBed.inject(ForecastService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('get current location weather data', () => {
    expect(forecastService).toBeDefined();
  });

  it('get current weather data', () => {
    let unit = 'metric';

    forecastService.getCurrentLocationWeatherData(unit).subscribe((res) => {
      expect(res).toEqual(mockCurrentWeather);
    });
  });

  it('get weather data by city name', () => {
    let cityName = 'kabul';
    let unit = 'metric';

    forecastService.getWeatherData(cityName, unit).subscribe((res) => {
      expect(res).toEqual(mockWeatherData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.baseUrl}find?q=${cityName}&appid=${environment.apiKey}&units=${unit}`,
    });
    req.flush(mockWeatherData);
  });

  it('get weather data by invalid city name', () => {
    let cityName = 'b';
    let unit = 'metric';
    let errMsg = 'bad query';

    forecastService.getWeatherData(cityName, unit).subscribe(
      (res) => {
        console.log({ res });
        fail(res);
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.error).toEqual(errMsg);
      }
    );

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.baseUrl}find?q=${cityName}&appid=${environment.apiKey}&units=${unit}`,
    });
    req.flush(errMsg, { status: 400, statusText: 'bad query' });
  });

  it('get stored weather data by its id', () => {
    let id = 1138958;
    let unit = 'metric';

    forecastService.getStoredWeatherData(id, unit).subscribe((res) => {
      expect(res).toEqual(mockCurrentWeather);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.baseUrl}weather?id=${id}&appid=${environment.apiKey}&units=${unit}`,
    });
    req.flush(mockCurrentWeather);
  });
});
