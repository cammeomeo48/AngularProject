import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../models/fashion';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];

  constructor(private fashionService: FashionService) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => this.fashions = data,
      error: (err) => console.error('Error fetching fashions', err)
    });
  }

  deleteFashion(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this fashion item?')) {
      this.fashionService.deleteFashion(id).subscribe({
        next: () => this.loadFashions(),
        error: (err) => console.error('Error deleting fashion', err)
      });
    }
  }
}
