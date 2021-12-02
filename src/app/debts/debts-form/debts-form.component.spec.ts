import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsFormComponent } from './debts-form.component';

describe('DebtsFormComponent', () => {
  let component: DebtsFormComponent;
  let fixture: ComponentFixture<DebtsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
