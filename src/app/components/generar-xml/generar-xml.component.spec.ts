import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarXmlComponent } from './generar-xml.component';

describe('GenerarXmlComponent', () => {
  let component: GenerarXmlComponent;
  let fixture: ComponentFixture<GenerarXmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarXmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
