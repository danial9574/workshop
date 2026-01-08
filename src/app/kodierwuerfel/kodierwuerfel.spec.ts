import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kodierwuerfel } from './kodierwuerfel';

describe('Kodierwuerfel', () => {
  let component: Kodierwuerfel;
  let fixture: ComponentFixture<Kodierwuerfel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kodierwuerfel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kodierwuerfel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
