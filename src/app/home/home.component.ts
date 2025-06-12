import { Component } from '@angular/core';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { SeriesService } from '../series.service';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SeriesCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //@Input() searchedSeriesArray!: BehaviorSubject<any>; //use ! to ensure that this will be initialized later

  private seriesService: SeriesService = inject(SeriesService);
  searchedSeriesArray!: BehaviorSubject<any>; 

  ngOnInit() {
    this.searchedSeriesArray = this.seriesService.searchedSeriesData;
  }

}
