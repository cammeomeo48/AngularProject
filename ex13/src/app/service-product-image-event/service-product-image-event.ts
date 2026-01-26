import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-product-image-event',
  imports: [CommonModule],
  templateUrl: './service-product-image-event.html',
  styleUrl: './service-product-image-event.css',
})
export class ServiceProductImageEvent {
  products: any[] = [];

  constructor(private pservice: ProductService, private router: Router) {
    this.products = pservice.getProductsWithImages();
  }

  viewDetail(p: any) {
    this.router.navigate(['service-product-image-event', p.ProductId]);
  }
}
