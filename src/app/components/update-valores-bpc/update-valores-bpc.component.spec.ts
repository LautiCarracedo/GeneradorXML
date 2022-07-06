import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateValoresBpcComponent } from './update-valores-bpc.component';

describe('UpdateValoresBpcComponent', () => {
  let component: UpdateValoresBpcComponent;
  let fixture: ComponentFixture<UpdateValoresBpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateValoresBpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateValoresBpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
