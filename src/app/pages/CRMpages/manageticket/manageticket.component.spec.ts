import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageticketComponent } from './manageticket.component';

describe('ManageticketComponent', () => {
  let component: ManageticketComponent;
  let fixture: ComponentFixture<ManageticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageticketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
