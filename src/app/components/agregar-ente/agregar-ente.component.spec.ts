import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEnteComponent } from './agregar-ente.component';

describe('AgregarEnteComponent', () => {
  let component: AgregarEnteComponent;
  let fixture: ComponentFixture<AgregarEnteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEnteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEnteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
