import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedListComponent } from './shortened-list.component';

describe('ShortenedListComponent', () => {
  let component: ShortenedListComponent;
  let fixture: ComponentFixture<ShortenedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortenedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortenedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
