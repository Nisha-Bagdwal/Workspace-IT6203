import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRideComponentComponent } from './schedule-ride-component.component';

describe('ScheduleRideComponentComponent', () => {
  let component: ScheduleRideComponentComponent;
  let fixture: ComponentFixture<ScheduleRideComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleRideComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleRideComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
