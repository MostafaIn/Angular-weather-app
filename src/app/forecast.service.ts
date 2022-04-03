import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WeatherDataListModel, WeatherModel } from './model/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  apiBaseUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.baseUrl;
    this.apiKey = environment.apiKey;
  }

  getWeatherData(
    cityName: string,
    unit: string
  ): Observable<WeatherDataListModel> {
    return this.http.get<WeatherDataListModel>(
      `${this.apiBaseUrl}find?q=${cityName}&appid=${this.apiKey}&units=${unit}`
    );
  }

  getStoredWeatherData(id: number, unit: string): Observable<WeatherModel> {
    return this.http.get<WeatherModel>(
      `${this.apiBaseUrl}weather?id=${id}&appid=${this.apiKey}&units=${unit}`
    );
  }

  getCurrentLocationWeatherData(unit: string) {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => observer.next(position),
        (error) => observer.next(error)
      );
    }).pipe(
      map((value: any) => {
        console.log(value);
        let coord =
          value.message === 'User denied Geolocation'
            ? { lon: 24.938379, lat: 60.169857 }
            : { lon: value.coords.longitude, lat: value.coords.latitude };
        return new HttpParams()
          .set('lon', coord.lon)
          .set('lat', coord.lat)
          .set('units', unit)
          .set('appid', this.apiKey);
      }),
      switchMap((values) =>
        this.http.get<WeatherModel>(`${this.apiBaseUrl}weather`, {
          params: values,
        })
      )
    );
  }
}
