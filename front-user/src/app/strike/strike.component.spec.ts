import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeComponent } from './strike.component';

describe('StrikeComponent', () => {
  let component: StrikeComponent;
  let fixture: ComponentFixture<StrikeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrikeComponent]
    });
    fixture = TestBed.createComponent(StrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
