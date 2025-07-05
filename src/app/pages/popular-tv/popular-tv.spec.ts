import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTv } from './popular-tv';

describe('PopularTv', () => {
  let component: PopularTv;
  let fixture: ComponentFixture<PopularTv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularTv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularTv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
