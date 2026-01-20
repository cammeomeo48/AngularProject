import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex15 } from './ex15';

describe('Ex15', () => {
  let component: Ex15;
  let fixture: ComponentFixture<Ex15>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex15]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex15);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
