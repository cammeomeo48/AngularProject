import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  alertMessage: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => this.cartItems = data,
      error: (err) => console.error('Error fetching cart', err)
    });
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartService.updateCartQuantity(productId, quantity).subscribe({
      next: (res) => {
        this.cartItems = res.cart;
        this.showMessage('Cart updated');
      },
      error: (err) => console.error('Error updating cart', err)
    });
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: (res) => {
        this.cartItems = res.cart;
        this.showMessage('Item removed');
      },
      error: (err) => console.error('Error removing item', err)
    });
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private showMessage(msg: string) {
    this.alertMessage = msg;
    setTimeout(() => this.alertMessage = '', 3000);
  }
}
