import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ceasar } from './ceasar';

describe('Ceasar', () => {
  let component: Ceasar;
  let fixture: ComponentFixture<Ceasar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ceasar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ceasar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
