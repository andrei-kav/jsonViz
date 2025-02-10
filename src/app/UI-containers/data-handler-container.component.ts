import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PrimengImportsModule} from '../primeng/imports';
import {SortingType, Workbook} from '../models/models';
import {CommonModule} from '@angular/common';
import {StorageService} from '../services/storage.service';
import {DataHandlerComponent} from '../UI/data-handler/data-handler.component';

@Component({
  selector: 'app-data-handler-container',
  imports: [
    CommonModule,
    PrimengImportsModule,
    DataHandlerComponent
  ],
  template: `
    <app-data-handler
      [workbooks]="storage.workbooks$ | async"
      [selectedWorkbook]="storage.selected$ | async"
      [sorting]="storage.sorting$ | async"
      [hideIf]="storage.hideIf$ | async"
      (workbookSelected)="onWorkbookSelected($event)"
      (hideIfChanged)="onHideIfChanged($event)"
      (sortingChanged)="onSortingChanged($event)"
    ></app-data-handler>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataHandlerContainerComponent {

  storage: StorageService = inject(StorageService)

  onSortingChanged(sorting: SortingType) {
    this.storage.changeSorting(sorting)
  }

  onWorkbookSelected(workbook: Workbook) {
    this.storage.selectWorkbook(workbook)
  }

  onHideIfChanged(value: number | null) {
    this.storage.changeHideIf(value)
  }

}
