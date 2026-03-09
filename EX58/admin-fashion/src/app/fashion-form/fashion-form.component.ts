import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { FashionService } from '../fashion.service';
import { Fashion } from '../models/fashion';

@Component({
  selector: 'app-fashion-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CKEditorModule],
  templateUrl: './fashion-form.component.html',
  styleUrls: ['./fashion-form.component.css']
})
export class FashionFormComponent implements OnInit {
  fashion: Fashion = {
    title: '',
    details: '',
    thumbnail: '',
    style: ''
  };
  isEditMode = false;
  fashionId: string | null = null;

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fashionId = this.route.snapshot.paramMap.get('id');
    if (this.fashionId) {
      this.isEditMode = true;
      this.fashionService.getFashion(this.fashionId).subscribe({
        next: (data) => this.fashion = data,
        error: (err) => console.error('Error fetching fashion', err)
      });
    }
  }

  saveFashion(): void {
    if (this.isEditMode && this.fashionId) {
      this.fashionService.updateFashion(this.fashionId, this.fashion).subscribe({
        next: () => this.router.navigate(['/fashions']),
        error: (err) => console.error('Error updating fashion', err)
      });
    } else {
      this.fashionService.createFashion(this.fashion).subscribe({
        next: () => this.router.navigate(['/fashions']),
        error: (err) => console.error('Error creating fashion', err)
      });
    }
  }
}
