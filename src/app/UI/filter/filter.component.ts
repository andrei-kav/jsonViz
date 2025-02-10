import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';
import {SortingType} from '../../models/models';
import {delay, filter, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-filter',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent implements AfterViewInit {

  @Input()
  sorting: SortingType | null = SortingType.DEFAULT
  @Input()
  hideIf: number | null = null
  @Input()
  isWorkbookSelected = false

  @Output()
  hideIfChanged: EventEmitter<number | null> = new EventEmitter<number | null>()
  @Output()
  sortingChanged: EventEmitter<SortingType> = new EventEmitter()

  sortingTypes = Object.values(SortingType)
  onHideIfChanged: EventEmitter<string | number | null> = new EventEmitter<string | number | null>()

  ngAfterViewInit() {
    // delay hideIf value changing for some time
    // to avoid emitting every time the inout changes
    this.onHideIfChanged.asObservable()
      .pipe(
        filter(value => typeof value === 'number' || value === null),
        switchMap(value => of(value).pipe(delay(700))))
      .subscribe((value) => {
          this.hideIfChanged.emit(value)
        }
      )
  }

}
