import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';
import {SortingType, Workbook, WorkbookData, Workbooks} from '../../models/models';
import {delay, of, switchMap} from 'rxjs';
import {CustomMessagesService} from '../../services/custom-messages.service';
import {UploadJsonFormComponent} from '../../UI/upload-json-form/upload-json-form.component';
import {WorkbookComponent} from '../../UI/workbook/workbook.component';
import {CommonModule} from '@angular/common';
import {FilterComponent} from '../../UI/filter/filter.component';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-data-handler-container',
  imports: [
    CommonModule,
    UploadJsonFormComponent,
    WorkbookComponent,
    FilterComponent,
    PrimengImportsModule
  ],
  templateUrl: './data-handler-container.component.html',
  styleUrl: './data-handler-container.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataHandlerContainerComponent implements OnInit {

  private customMessagesService: CustomMessagesService = inject(CustomMessagesService)

  storage: StorageService = inject(StorageService)
  onHideIfChanged = new EventEmitter<number | null>()

  ngOnInit() {
    this.listenToOnHideIfChanged()
  }

  onJsonUpload(event: { files: File[] }) {
    const file: File = event.files[0]

    if (!file) {
      this.customMessagesService.message('info', 'Info', 'No files chosen')
      return
    }

    if (file.type !== 'application/json') {
      this.customMessagesService.message('error', 'Error', 'Only JSON files are available')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      this.customMessagesService.message('error', 'Error', 'The file size is too big (max is 5MB)')
      return
    }

    this.handleFile(file)
  }

  onSortingChanged(sorting: SortingType) {
    this.storage.changeSorting(sorting)
  }

  onWorkbookSelected(workbook: Workbook) {
    this.storage.selectWorkbook(workbook)
  }

  private listenToOnHideIfChanged() {
    // delay hideIf value changing for some time
    // to avoid rerendering after every input
    this.onHideIfChanged.asObservable()
      .pipe(switchMap(value => of(value).pipe(delay(700))))
      .subscribe((value) => {
          this.storage.changeHideIf(value)
        }
      )
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (this.parseData(data)) {
          return this.storage.addWorkbook(file.name, data)
        }
        this.customMessagesService.message('error', 'Error', 'JSON structure is not correct')
      } catch (error: unknown) {
        this.customMessagesService.message('error', 'Error', 'JSON processing error occurred')
      }
    }
    reader.readAsText(file);
  }

  /**
   * Provided data should be of type
   * [ { category: "any string", value: number } ]
   * @param data
   * @private
   */
  private parseData(data: unknown): data is WorkbookData {
    return Array.isArray(data) && data
      .every(item => typeof item === 'object'
        && Object.keys(item).length === 2
        && ['category', 'value'].every(value => Object.keys(item).includes(value))
        && typeof item['category'] === 'string'
        && typeof item['value'] === 'number'
      )
  }

}
