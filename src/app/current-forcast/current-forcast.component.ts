import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-current-forcast',
  templateUrl: './current-forcast.component.html',
  styleUrls: ['./current-forcast.component.scss'],
})
export class CurrentForcastComponent implements OnInit, AfterContentInit {
  @Input() weatherData: any;
  @Input() errorMsg: string;

  ngOnInit(): void {
  }
  ngAfterContentInit(): void{
    console.log(this.weatherData)
  }
}
