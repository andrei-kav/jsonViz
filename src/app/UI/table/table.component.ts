import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Workbook, Workbooks} from '../../models/models';
import {PrimengImportsModule} from '../../primeng/imports';

@Component({
  selector: 'app-table',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input()
  workbooks: Workbooks | null = null
  @Input()
  selectedWorkbook: Workbook | null = null

  @Output()
  workbookSelected: EventEmitter<Workbook> = new EventEmitter<Workbook>()
}
