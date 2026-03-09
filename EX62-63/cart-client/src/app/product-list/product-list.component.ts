import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  alertMessage: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products', err)
    });
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.alertMessage = 'Successfully added to cart!';
        setTimeout(() => this.alertMessage = '', 3000);
      },
      error: (err) => {
        this.alertMessage = 'Failed to add to cart.';
        setTimeout(() => this.alertMessage = '', 3000);
      }
    });
  }
}
