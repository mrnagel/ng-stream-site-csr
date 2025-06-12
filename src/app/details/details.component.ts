import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private id: Number = -1;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private seriesService: SeriesService = inject(SeriesService);
  
  title: string = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    
    //this.seriesService.getSeriesTitleById(this.id);
    



  }
}
