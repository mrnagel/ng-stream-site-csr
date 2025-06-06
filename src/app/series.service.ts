import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, map} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private http: HttpClient = inject(HttpClient);
  private readonly searchApiComps: string[] = ['https://api.jikan.moe/v4/anime?q=', '&limit=20&sfw=true']
  private readonly topApi: string = 'https://api.jikan.moe/v4/top/anime?limit=20&sfw=true'
  mockSeries: string = '';
  
  searchedSeriesData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { //constructor runs before angular initializes the service, @Input values are not accessible in constructor
    this.fetchSeriesData(); //angular does not call ngOnInit in services, so we call the function here
  }

   fetchSeriesData(){
      //get will return a json object that is an array of sorts, specifically series.data
      //will render that "array" to series card objects for now
      let fetchUrl: string = '';

      if(this.mockSeries === ''){
        fetchUrl = this.topApi;
      } else{
        fetchUrl = `${this.searchApiComps[0]}${this.mockSeries}${this.searchApiComps[1]}`
      }

      
      this.http.get<any>(fetchUrl).pipe(
        map(response => response.data), //transforms each emitted value in an observable stream
        catchError((error)=> {
          console.log('Error fetching data')
          return EMPTY;
        })
      ).subscribe((response) => {
        this.searchedSeriesData.next(response);
      });

      this.mockSeries = '';
   }





}
