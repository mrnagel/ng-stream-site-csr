import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ResolveFn } from '@angular/router';
import { seriesResolver } from './series.service';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details',
        resolve: { data: seriesResolver }
    }

];
