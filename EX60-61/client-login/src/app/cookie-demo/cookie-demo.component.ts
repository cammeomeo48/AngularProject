import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cookie-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-demo.component.html',
  styleUrls: ['./cookie-demo.component.css']
})
export class CookieDemoComponent {
  outputMessage: string = '';

  constructor(private authService: AuthService) { }

  createCookie() {
    this.authService.createCookie().subscribe({
      next: (res) => this.outputMessage = 'Server Response: ' + res,
      error: (err) => this.outputMessage = 'Error creating cookies: ' + err.message
    });
  }

  readCookie() {
    this.authService.readCookie().subscribe({
      next: (res) => this.outputMessage = res, // HTML string from server
      error: (err) => this.outputMessage = 'Error reading cookies: ' + err.message
    });
  }

  clearCookie() {
    this.authService.clearCookie().subscribe({
      next: (res) => this.outputMessage = 'Server Response: ' + res,
      error: (err) => this.outputMessage = 'Error clearing cookies: ' + err.message
    });
  }
}
