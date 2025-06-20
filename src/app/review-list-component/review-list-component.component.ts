import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-review-list-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './review-list-component.component.html',
  styleUrl: './review-list-component.component.css'
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];       // Displayed filtered reviews
  allReviews: any[] = [];    // Master copy of all reviews
  isLoading = false;
  isFetching = false;
  error: string = '';

  filters = {
    rating: false,
    reviews: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.isLoading = true;
    this.http.get<any[]>('https://your-api.com/reviews-endpoint').subscribe({
      next: (data) => {
        this.allReviews = data;
        this.reviews = [...this.allReviews]; // clone data
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load reviews';
        this.isLoading = false;
      }
    });
  }

FilterChange(type: 'rating' | 'reviews', checked: boolean) {
    console.log('Checkbox changed:', type, checked);
    this.filters[type] = checked;
    this.applyFilters();
  }
  
  applyFilters() {
    let filtered = [...this.allReviews];
  
    // Apply rating filter
    if (this.filters.rating) {
      filtered = filtered.filter(item => item.rating >= 4);
  
      // ✅ Sort by price ascending
      filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
  
    // Apply reviews count filter
    if (this.filters.reviews) {
      filtered = filtered.filter(item => item.totalReviews >= 10);
  
      // ✅ Sort by totalReviews descending
      filtered = filtered.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
    }
  
    this.reviews = filtered;
  }
  
  

  getStars(rating: number = 0): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.round(rating) ? 'assets/star-filled.png' : 'assets/star-empty.svg');
    }
    return stars;
  }
}

