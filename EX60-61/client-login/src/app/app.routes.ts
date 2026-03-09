import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CookieDemoComponent } from './cookie-demo/cookie-demo.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'cookie-demo', component: CookieDemoComponent }
];
