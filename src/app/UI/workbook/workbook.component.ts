import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Workbook} from '../../models/models';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-workbook',
  imports: [
    CommonModule
  ],
  templateUrl: './workbook.component.html',
  styleUrl: './workbook.component.less',
})
export class WorkbookComponent implements OnChanges {

  @Input()
  workbook: Workbook | null = null

  @Input()
  isSelected = false

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.workbook?.name)
    console.log(changes)
  }

}
