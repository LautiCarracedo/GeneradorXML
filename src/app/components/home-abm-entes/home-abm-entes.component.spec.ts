import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAbmEntesComponent } from './home-abm-entes.component';

describe('HomeAbmEntesComponent', () => {
  let component: HomeAbmEntesComponent;
  let fixture: ComponentFixture<HomeAbmEntesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAbmEntesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAbmEntesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
