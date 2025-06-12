import { Component, inject} from '@angular/core';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-series-card',
  imports: [MatCardModule, MatTooltip, RouterModule],
  templateUrl: './series-card.component.html',
  styleUrl: './series-card.component.scss'
})
export class SeriesCardComponent {
  @Input() data!: any;
  



}
