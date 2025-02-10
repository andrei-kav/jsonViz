import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SortingType, Workbook, Workbooks} from '../../models/models';
import {TableComponent} from '../table/table.component';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-data-handler',
  imports: [
    TableComponent,
    FilterComponent
  ],
  templateUrl: './data-handler.component.html',
  styleUrl: './data-handler.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataHandlerComponent {

  @Input()
  workbooks: Workbooks | null = null
  @Input()
  selectedWorkbook: Workbook | null = null
  @Input()
  sorting: SortingType | null = SortingType.DEFAULT
  @Input()
  hideIf: number | null = null

  @Output()
  workbookSelected: EventEmitter<Workbook> = new EventEmitter<Workbook>()
  @Output()
  hideIfChanged: EventEmitter<number | null> = new EventEmitter<number | null>()
  @Output()
  sortingChanged: EventEmitter<SortingType> = new EventEmitter()

}
