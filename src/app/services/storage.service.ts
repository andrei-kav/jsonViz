import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/app.state';
import {getSelectedWorkbook, getWorkbookList} from '../store/workbook/workbook.selectors';
import {getHideIf, getSorting} from '../store/filter/filter.selectors';
import {SortingType, Workbook, WorkbookData, Workbooks} from '../models/models';
import {selectWorkbook, setWorkbooks} from '../store/workbook/workbook.actions';
import {combineLatest, first} from 'rxjs';
import {CustomMessagesService} from './custom-messages.service';
import {setHideIf, setSorting} from '../store/filter/filter.actions';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private store: Store<AppState> = inject(Store<AppState>)
  private customMessagesService: CustomMessagesService = inject(CustomMessagesService)

  workbooks$ = this.store.pipe(select(getWorkbookList))
  selected$ = this.store.pipe(select(getSelectedWorkbook))

  sorting$ = this.store.pipe(select(getSorting))
  hideIf$ = this.store.pipe(select(getHideIf))

  renderRelated$ = combineLatest([this.selected$, this.sorting$, this.hideIf$])

  selectWorkbook(workbook: Workbook) {
    this.store.dispatch(selectWorkbook({ selected: workbook }))
  }

  changeSorting(sorting: SortingType) {
    this.store.dispatch(setSorting({ sorting: sorting }))
  }

  changeHideIf(value: number | null) {
    this.store.dispatch(setHideIf({ hideIfLessOrEqual: value }))
  }

  addWorkbook(name: string, data: WorkbookData) {
    combineLatest([this.workbooks$, this.selected$])
      .pipe<[Workbooks, Workbook | null]>(first())
      .subscribe(([workbooks, selected]) => {
        const newWorkbook = {name, data, added: new Date()}
        if (workbooks.length === 0) {
          this.addFirstWorkbook(newWorkbook)
        } else {
          this.addWorkbookToExisting(workbooks, selected, newWorkbook)
        }
      })
  }

  private addFirstWorkbook(workbook: Workbook) {
    this.addWorkbooksToStore([workbook])
    this.selectWorkbook(workbook)
  }

  private addWorkbookToExisting(current: Workbooks, selected: Workbook | null, newWorkbook: Workbook) {
    const {name} = newWorkbook

    const alreadyExists = current.find(item => item.name === name)
    const amountExceeded = current.length > 4

    let updatedWorkbooks = [...current, newWorkbook]
    let confirmMessage = ''

    if (alreadyExists && selected?.name === newWorkbook.name) {
      const message = `You already have a workbook with the name "${name}" and it is in use`
      this.customMessagesService.message('warn', 'Warning', message)
      return
    } else if (alreadyExists) {
      confirmMessage = `You already have a workbook with the name "${name}". Confirm to remove it and replace with another one`
      updatedWorkbooks = [...current.filter(item => item.name !== name), newWorkbook]
    } else if (amountExceeded) {
      confirmMessage = `Your workbook exceed the limit. Confirm to delete the first workbook "${current[0].name}".`
      updatedWorkbooks = [...current.slice(1), newWorkbook]
    }

    if (confirmMessage) {
      this.customMessagesService
        .confirm(confirmMessage)
        .confirm({
          accept: () => this.addWorkbooksToStore(updatedWorkbooks),
          reject: () => this.customMessagesService.message('warn', 'Rejected', 'You have rejected uploading')
        })
    } else {
      this.addWorkbooksToStore(updatedWorkbooks)
    }
  }

  private addWorkbooksToStore(workbooks: Workbooks) {
    this.store.dispatch(setWorkbooks({ workbooks }))
    this.customMessagesService.message('success', 'Success', 'File successfully uploaded')
  }

}
