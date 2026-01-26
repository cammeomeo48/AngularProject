import { Routes } from '@angular/router';
import { Product } from './product/product';
import { ListProduct } from './list-product/list-product';
import { ServiceProduct } from './service-product/service-product';

export const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
];
