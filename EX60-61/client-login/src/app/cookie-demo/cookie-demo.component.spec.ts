import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieDemoComponent } from './cookie-demo.component';

describe('CookieDemoComponent', () => {
  let component: CookieDemoComponent;
  let fixture: ComponentFixture<CookieDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookieDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
