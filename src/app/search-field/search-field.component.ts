import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { MatDialog } from '@angular/material/dialog';
import { CityModalComponent } from './city-modal/city-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Unit {
  value: string;
  viewValue: string;
}

export interface DialogData {
  list: [];
  cityname: string;
}

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  @Output() weatherForecastData: any = new EventEmitter<any>();
  @Input() errorMsg: string;
  selectedWeatherData: any;
  disabledForecastButton: boolean = false;
  cityName: string;
  selectedUnit: string = 'metric';
  units: Unit[] = [
    { value: 'metric', viewValue: 'Metric' },
    { value: 'imperial', viewValue: 'Imperial' },
  ];
  storedWeatherData = localStorage.getItem('weatherApp');

  constructor(
    private forecastService: ForecastService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  openDialog(list: any): void {
    const dialogRef = this.dialog.open(CityModalComponent, {
      data: { cityname: this.cityName, list: list },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.selectedWeatherData = result;
      this.weatherForecastData.emit(result);
      this.saveToLocalStorage(result.id, this.selectedUnit);
    });
  }

  onSubmitCityName(city: string, unit: string) {
    console.log('submit by city', { city, unit });

    this.forecastService.getWeatherData(city, unit).subscribe(
      (data) => {
        this.weatherForecastData.emit(data.list[0]);
        this.openDialog(data.list);
      },
      (error) => {
        console.log(error.error.message);
        this.errorMsg = 'Please enter a valid city name!';
        this.openNotificationBar();
      }
    );
  }

  onSubmitUnit(city: string, unit: string) {
    let selectedItem: any;
    if (this.storedWeatherData) {
      selectedItem = JSON.parse(this.storedWeatherData);
      console.log(selectedItem);
    }
    if (city) {
      console.log('IF CITY', { city, unit });
      this.forecastService.getWeatherData(city, unit).subscribe((data) => {
        selectedItem = data.list.find(
          (item: { id: any }) => item.id === this.selectedWeatherData.id
        );
        console.log(selectedItem);
        Object.assign(selectedItem, { unit: this.selectedUnit });
        this.saveToLocalStorage(selectedItem.id, this.selectedUnit);
        this.weatherForecastData.emit(selectedItem);
      });
    } else {
      console.log('submit by unit:', unit);
      this.forecastService.getCurrentLocationWeatherData(unit).subscribe(
        (data) => {
          Object.assign(data, { unit: this.selectedUnit });
          this.weatherForecastData.emit(data);
          this.saveToLocalStorage(data.id, this.selectedUnit);
        },
        (error) => {
          this.errorMsg = <any>error.error.message.split('.')[0];
        }
      );
    }
  }

  onSearchCity(event: Event) {
    console.log('event value', (<HTMLInputElement>event.target).value);
    this.cityName = (<HTMLInputElement>event.target).value;
    this.disabledForecastButton = false;
  }

  onClear(event: Event) {
    console.log(event);
    this.cityName = '';
  }

  openNotificationBar() {
    this._snackBar.open(this.errorMsg, 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  saveToLocalStorage(id: number, unit: string) {
    window.localStorage.setItem('weatherApp', JSON.stringify({ id, unit }));
  }
}
