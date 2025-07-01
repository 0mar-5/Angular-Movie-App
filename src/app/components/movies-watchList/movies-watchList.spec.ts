import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesWatchList } from './movies-watchList';

describe('MoviesWishlist', () => {
  let component: MoviesWatchList;
  let fixture: ComponentFixture<MoviesWatchList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesWatchList],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesWatchList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
