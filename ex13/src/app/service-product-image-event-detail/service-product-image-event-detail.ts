import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-product-image-event-detail',
  imports: [CommonModule],
  templateUrl: './service-product-image-event-detail.html',
  styleUrl: './service-product-image-event-detail.css',
})
export class ServiceProductImageEventDetail {
  selectedProduct: any;

  constructor(private route: ActivatedRoute, private pservice: ProductService, private router: Router) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.selectedProduct = this.pservice.getProductDetail(id);
    });
  }

  goBack() {
    this.router.navigate(['service-product-image-event']);
  }
}
