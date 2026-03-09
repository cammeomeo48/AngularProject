import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'fashions/:id', component: FashionDetailComponent },
    { path: '**', redirectTo: '' }
];
