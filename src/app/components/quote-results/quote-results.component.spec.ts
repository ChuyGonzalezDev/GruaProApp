import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteResultsComponent } from './quote-results.component';

describe('QuoteResultsComponent', () => {
  let component: QuoteResultsComponent;
  let fixture: ComponentFixture<QuoteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
