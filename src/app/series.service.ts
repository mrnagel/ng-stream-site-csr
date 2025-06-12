import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, map} from 'rxjs';
import { catchError, filter, finalize, take, tap } from 'rxjs/operators';
import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private http: HttpClient = inject(HttpClient);
  private readonly searchApiComps: string[] = ['https://api.jikan.moe/v4/anime?q=', '&limit=20&sfw=true']
  private readonly topApi: string = 'https://api.jikan.moe/v4/top/anime?limit=20&sfw=true'
  mockSeries: string = '';
  dataLoaded: boolean = false;
  
  searchedSeriesData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { //constructor runs before angular initializes the service, @Input values are not accessible in constructor
    this.fetchSeriesData(); //angular does not call ngOnInit in services, so we call the function here
  }

   fetchSeriesData(){
      //get will return a json object that is an array of sorts, specifically series.data
      //will render that "array" to series card objects for now
      this.dataLoaded = false;
      let fetchUrl: string = '';

      if(this.mockSeries === ''){
        fetchUrl = this.topApi;
      } else{
        fetchUrl = `${this.searchApiComps[0]}${this.mockSeries}${this.searchApiComps[1]}`
      }

      
      this.http.get<any>(fetchUrl).pipe(
        map(response => response.data), //transforms each emitted value in an observable stream
        catchError((error)=> {
          console.log('Error fetching data');
          return EMPTY;
        }),
      ).subscribe((response) => {
        this.dataLoaded=true;
        console.log('data loaded set to true in subscribe()');
        this.searchedSeriesData.next(response); 
      });

      this.mockSeries = '';
      // this.dataLoaded = true; DO NOT PUT THIS HERE, WILL SET TRUE BEFORE API RESPONSE
   }

// TODO: getSeriesTitleById(id: Number): Observable<string> { (keeps returning null)

   showSeries(){
    console.log('works')
    console.log(this.searchedSeriesData.getValue());

   }

}

export const seriesResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const seriesService: SeriesService = inject(SeriesService);
  return seriesService.searchedSeriesData.pipe(
    tap(() =>  console.log('Data loaded is currently', seriesService.dataLoaded, 'in seriesResolver')),
    filter(() => seriesService.dataLoaded),
    take(1),
    tap(() => seriesService.showSeries())
  )
}
