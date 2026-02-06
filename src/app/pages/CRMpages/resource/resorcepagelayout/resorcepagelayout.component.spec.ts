import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResorcepagelayoutComponent } from './resorcepagelayout.component';

describe('ResorcepagelayoutComponent', () => {
  let component: ResorcepagelayoutComponent;
  let fixture: ComponentFixture<ResorcepagelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResorcepagelayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResorcepagelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
