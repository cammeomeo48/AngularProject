import { Component } from '@angular/core';

@Component({
  selector: 'app-mybinding',
  standalone: false,
  templateUrl: './mybinding.html',
  styleUrl: './mybinding.css',
})
export class Mybinding {
  public fullName: string = 'Nguyen Van A';
  public email: string = 'nguyenvana@example.com';
  public readonly: boolean = true;
  public computedFullName: string = '';
  public personal_style = {
    color: 'blue',
    fontWeight: 'bold',
  };

  setFullName(fn: string, mn: string, ln: string): void {
    this.computedFullName = (fn + ' ' + mn + ' ' + ln).trim();
  }
}
