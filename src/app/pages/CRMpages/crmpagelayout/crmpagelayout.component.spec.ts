import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmpagelayoutComponent } from './crmpagelayout.component';

describe('CrmpagelayoutComponent', () => {
  let component: CrmpagelayoutComponent;
  let fixture: ComponentFixture<CrmpagelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmpagelayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmpagelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
