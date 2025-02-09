import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';
import {SortingType} from '../../models/models';

@Component({
  selector: 'app-filter',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent {

  @Input()
  sorting: SortingType | null = SortingType.DEFAULT
  @Input()
  hideIf: number | null = null
  @Input()
  isWorkbookSelected = false
  @Input()
  hideIfChanged: EventEmitter<number | null> = new EventEmitter<number | null>()

  @Output()
  onSortingChanged: EventEmitter<SortingType> = new EventEmitter()

  sortingTypes = Object.values(SortingType)

  onHideIfInput(value: string | number | null) {
    this.hideIfChanged.emit(typeof value === 'number' ? value : null)
  }

}
