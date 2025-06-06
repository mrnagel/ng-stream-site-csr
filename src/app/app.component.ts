import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SeriesService } from './series.service';
import { inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, MatToolbarModule, MatInputModule, ReactiveFormsModule, MatIconModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-stream-site-csr';

  seriesService: SeriesService = inject(SeriesService);
  searchedSeriesArray!: BehaviorSubject<any>; //use ! to ensure that this will be initialized later

  searchForm: FormGroup = new FormGroup({
    searchQuery: new FormControl('')
  })

  ngOnInit(){
     this.searchedSeriesArray = this.seriesService.searchedSeriesData;
     
  }

  onSubmit(){
    this.seriesService.mockSeries = this.searchForm.value.searchQuery;
    this.seriesService.fetchSeriesData();
    this.searchForm.reset(); //reset the form after submission

  }


}
