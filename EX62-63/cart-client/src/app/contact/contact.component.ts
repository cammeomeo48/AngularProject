import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: string = 'Loading...';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getContact().subscribe({
      next: (res) => this.message = res,
      error: (err) => this.message = 'Error connecting to server.'
    });
  }
}
