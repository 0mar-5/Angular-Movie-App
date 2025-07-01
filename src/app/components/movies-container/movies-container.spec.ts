import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesContainer } from './movies-container';

describe('MoviesContainer', () => {
  let component: MoviesContainer;
  let fixture: ComponentFixture<MoviesContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
