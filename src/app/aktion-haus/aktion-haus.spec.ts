import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktionHaus } from './aktion-haus';

describe('AktionHaus', () => {
  let component: AktionHaus;
  let fixture: ComponentFixture<AktionHaus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktionHaus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktionHaus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
