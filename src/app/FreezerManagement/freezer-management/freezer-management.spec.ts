import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezerManagement } from './freezer-management';

describe('FreezerManagement', () => {
  let component: FreezerManagement;
  let fixture: ComponentFixture<FreezerManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreezerManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreezerManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
