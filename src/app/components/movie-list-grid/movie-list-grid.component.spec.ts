import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListGridComponent } from './movie-list-grid.component';

describe('MovieListGridComponent', () => {
  let component: MovieListGridComponent;
  let fixture: ComponentFixture<MovieListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
