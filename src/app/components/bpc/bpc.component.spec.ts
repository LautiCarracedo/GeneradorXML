import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpcComponent } from './bpc.component';

describe('BpcComponent', () => {
  let component: BpcComponent;
  let fixture: ComponentFixture<BpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
