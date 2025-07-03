import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvContainer } from './tv-container';

describe('TvContainer', () => {
  let component: TvContainer;
  let fixture: ComponentFixture<TvContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
