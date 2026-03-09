import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  message = '';
  isSuccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Attempt to read the login cookie on component mount
    this.authService.getLoginCookie().subscribe({
      next: (cookieData) => {
        if (cookieData && cookieData.username) {
          this.username = cookieData.username;
          this.password = cookieData.password;
          this.message = 'Login info auto-filled from secure Cookie!';
          this.isSuccess = true;
        }
      },
      error: (err) => console.log('No login cookie found or error reading it', err)
    });
  }

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.message = res.message + '. Cookie saved! Refresh page to see auto-fill.';
        this.isSuccess = true;
      },
      error: (err) => {
        this.message = err.error?.message || 'Login failed';
        this.isSuccess = false;
      }
    });
  }
}
