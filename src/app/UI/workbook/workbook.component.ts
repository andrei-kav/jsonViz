import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Workbook} from '../../models/models';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-workbook',
  imports: [
    CommonModule
  ],
  templateUrl: './workbook.component.html',
  styleUrl: './workbook.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbookComponent {

  @Input()
  workbook: Workbook | null = null

  @Input()
  isSelected = false

}
