import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FashionService } from '../fashion.service';
import { Fashion } from '../models/fashion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fashions: Fashion[] = [];
  groupedFashions: { [key: string]: Fashion[] } = {};
  filteredGroupedFashions: { [key: string]: Fashion[] } = {};

  styles: string[] = [];
  selectedStyle: string = '';
  searchText: string = '';

  constructor(private fashionService: FashionService) { }

  ngOnInit(): void {
    this.loadStyles();
    this.loadFashions();
  }

  loadStyles(): void {
    this.fashionService.getStyles().subscribe({
      next: (data) => this.styles = data,
      error: (err) => console.error('Error fetching styles', err)
    });
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.groupFashions();
      },
      error: (err) => console.error('Error fetching fashions', err)
    });
  }

  groupFashions(): void {
    const grouped = this.fashions.reduce((acc: any, fashion) => {
      if (!acc[fashion.style]) {
        acc[fashion.style] = [];
      }
      acc[fashion.style].push(fashion);
      return acc;
    }, {});
    this.groupedFashions = grouped;
    this.applyFilter();
  }

  applyFilter(): void {
    let filtered = this.fashions;

    // Filter by style
    if (this.selectedStyle) {
      filtered = filtered.filter(f => f.style === this.selectedStyle);
    }

    // Filter by text
    if (this.searchText.trim()) {
      const lowerText = this.searchText.toLowerCase().trim();
      filtered = filtered.filter(f =>
        f.title.toLowerCase().includes(lowerText) ||
        f.details.toLowerCase().includes(lowerText)
      );
    }

    // Regroup
    const newGrouped = filtered.reduce((acc: any, fashion) => {
      if (!acc[fashion.style]) acc[fashion.style] = [];
      acc[fashion.style].push(fashion);
      return acc;
    }, {});

    this.filteredGroupedFashions = newGrouped;
  }
}
