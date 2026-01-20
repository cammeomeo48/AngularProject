import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCategory, CatalogService } from '../services/catalog-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ex14',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ex14.html',
  styleUrl: './ex14.css',
})
export class Ex14 {
  categories: CatalogCategory[];
  constructor(private cs: CatalogService) {
    this.categories = cs.getCategories();
  }
}
