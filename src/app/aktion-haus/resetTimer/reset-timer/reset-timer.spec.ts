import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTimer } from './reset-timer';

describe('ResetTimer', () => {
  let component: ResetTimer;
  let fixture: ComponentFixture<ResetTimer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetTimer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetTimer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
