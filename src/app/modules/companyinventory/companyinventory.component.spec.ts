import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinventoryComponent } from './companyinventory.component';

describe('CompanyinventoryComponent', () => {
  let component: CompanyinventoryComponent;
  let fixture: ComponentFixture<CompanyinventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
