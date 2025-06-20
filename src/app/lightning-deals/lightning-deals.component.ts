import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lightning-deals',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lightning-deals.component.html',
  styleUrls: ['./lightning-deals.component.css']
})
export class LightningDealsComponent  {
  reviews: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    const url = 'https://api.trustoo.io/api/v1/reviews/get_product_reviews';
    const params = new HttpParams()
      .set('shop_id', '64371196054')
      .set('t', '1750395127804')
      .set('limit', '30')
      .set('page', '1')
      .set('sort_by', 'comprehensive-descending')
      .set('scene', '3')
      .set('is_feature', '1');

    this.http.get<any>(url, { params }).subscribe({
      next: (res:any) => {
        console.log(res,'res------------')
        // this.reviews = res?.data?.list || [];
        this.reviews = (res?.data?.list || []).map((item:any) => ({
          ...item,
          product_info: {
            ...item.product_info,
            discount: item.product_info?.discount || 50,
            price: item.product_info?.price || 299,
            old_price: item.product_info?.old_price || 999,
          }
        }));
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load reviews';
        this.isLoading = false;
      }
    });
  }
  
}
