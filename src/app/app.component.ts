import { Component, OnInit, Input } from '@angular/core';
import { ForecastService } from './forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() weatherForecastData: any;
  weatherData: any;
  unit: string = 'metric';
  errorMsg: string;

  constructor(private forcastService: ForecastService) {}

  ngOnInit(): void {
    let storedWeather = localStorage.getItem('weatherApp');
    if (storedWeather) {
      let storedData = JSON.parse(storedWeather);
      this.unit = storedData.unit;
      this.forcastService
        .getStoredWeatherData(storedData.id, storedData.unit)
        .subscribe(
          (data) => {
            Object.assign(data, { unit: this.unit });
            this.weatherData = data;
          },
          (error) => (this.errorMsg = <any>error.error.message.split('.')[0])
        );
    } else {
      this.forcastService.getCurrentLocationWeatherData(this.unit).subscribe(
        (data) => {
          Object.assign(data, { unit: this.unit });
          this.weatherData = data;
        },
        (error) => {
          this.errorMsg = <any>error.error.message.split('.')[0];
        }
      );
    }
  }

  recieveData(data: any) {
    this.weatherData = data;
  }
}
