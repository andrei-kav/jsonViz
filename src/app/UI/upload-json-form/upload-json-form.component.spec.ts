import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadJsonFormComponent } from './upload-json-form.component';

describe('UploadJsonFormComponent', () => {
  let component: UploadJsonFormComponent;
  let fixture: ComponentFixture<UploadJsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadJsonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadJsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
