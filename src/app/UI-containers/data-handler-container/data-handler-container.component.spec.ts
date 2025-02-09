import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHandlerContainerComponent } from './data-handler-container.component';

describe('DataHandlerContainerComponent', () => {
  let component: DataHandlerContainerComponent;
  let fixture: ComponentFixture<DataHandlerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataHandlerContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataHandlerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
