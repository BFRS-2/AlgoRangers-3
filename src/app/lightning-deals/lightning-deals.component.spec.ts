import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningDealsComponent } from './lightning-deals.component';

describe('LightningDealsComponent', () => {
  let component: LightningDealsComponent;
  let fixture: ComponentFixture<LightningDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightningDealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightningDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
