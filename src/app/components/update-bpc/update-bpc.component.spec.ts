import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBPCComponent } from './update-bpc.component';

describe('UpdateBPCComponent', () => {
  let component: UpdateBPCComponent;
  let fixture: ComponentFixture<UpdateBPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
