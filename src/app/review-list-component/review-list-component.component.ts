import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-review-list-component',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './review-list-component.component.html',
  styleUrl: './review-list-component.component.css',
})
export class ReviewListComponentComponent {
  reviews: any[] = [];
  page = 0;
  limit = 20;
  isLoading = true;
  isFetching = false;
  error: string | null = null;
  originalReviews: any[] = []; // backup full list
  
  filters = {
    rating: false,
    reviews: false
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    if (this.isFetching) return;

    this.isFetching = true;

    const url = 'http://172.16.5.30:8085/sorted-view';
    const params = new HttpParams()
      .set('type', 'reviews')
      .set('page', this.page.toString())
      .set('pageSize', this.limit.toString());

    this.http.get<any>(url, { params }).subscribe({
      next: (res) => {
        console.log(res,'resdghfhvhjgv')
        const newReviews = res?.content || [];
        this.reviews = [...this.reviews, ...newReviews];
        this.page++;
        this.isLoading = false;
        this.isFetching = false;
      },
      error: () => {
        this.error = 'Failed to load reviews';
        this.isLoading = false;
        this.isFetching = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position >= height - threshold && !this.isFetching && !this.isLoading) {
      this.fetchReviews();
    }
  }

  getStars(rating: number = 0): string[] {
    const fullStar = 'https://upload.wikimedia.org/wikipedia/commons/1/17/Star_full.svg';
    const halfStar = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Star_half.svg';
    const emptyStar = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg';

    const stars: string[] = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        stars.push(fullStar);
      } else if (roundedRating + 0.5 === i) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  }
  onCheckboxChange(event: Event, type: 'rating' | 'reviews') {
    const input = event.target as HTMLInputElement;
    this.onFilterChange(type, input.checked);
  }
  
  onFilterChange(type: 'rating' | 'reviews', checked: boolean) {
    this.filters[type] = checked;
    this.applyFilters();
  }
  
  applyFilters() {
    let filtered = [...this.reviews];
  
    if (this.filters.rating) {
      filtered = filtered.filter(item => item.rating >= 4);
      // Sort by price (ascending)
      filtered = filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    }
  
    if (this.filters.reviews) {
      filtered = filtered.filter(item => item.totalReviews >= 10);
      // Sort by totalReviews (descending)
      filtered = filtered.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
    }
  
    this.reviews = filtered;
  }
}