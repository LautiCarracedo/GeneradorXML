import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosEntesComponent } from './otros-entes.component';

describe('OtrosEntesComponent', () => {
  let component: OtrosEntesComponent;
  let fixture: ComponentFixture<OtrosEntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosEntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosEntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
