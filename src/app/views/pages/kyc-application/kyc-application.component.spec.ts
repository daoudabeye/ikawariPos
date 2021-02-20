import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycApplicationComponent } from './kyc-application.component';

describe('KycApplicationComponent', () => {
  let component: KycApplicationComponent;
  let fixture: ComponentFixture<KycApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
