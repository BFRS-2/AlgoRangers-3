import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListComponentComponent } from './review-list-component.component';

describe('ReviewListComponentComponent', () => {
  let component: ReviewListComponentComponent;
  let fixture: ComponentFixture<ReviewListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
