import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOpComponent } from './dashboard-op.component';

describe('DashboardOpComponent', () => {
  let component: DashboardOpComponent;
  let fixture: ComponentFixture<DashboardOpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOpComponent]
    });
    fixture = TestBed.createComponent(DashboardOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
