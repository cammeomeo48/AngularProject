import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../models/fashion';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion | undefined;

  constructor(
    private route: ActivatedRoute,
    private fashionService: FashionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashion(id).subscribe({
        next: (data) => this.fashion = data,
        error: (err) => console.error('Error fetching fashion details', err)
      });
    }
  }
}
