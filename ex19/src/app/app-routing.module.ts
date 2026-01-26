import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Product } from './product/product';
import { ListProduct } from './list-product/list-product';
import { ServiceProduct } from './service-product/service-product';

const routes: Routes = [
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  Product,
  ListProduct,
  ServiceProduct,
];