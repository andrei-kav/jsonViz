import {createFeatureSelector, createSelector} from '@ngrx/store';
import {WorkbookState} from './workbook.state';

const selectWorkbookState = createFeatureSelector<WorkbookState>('workbook')

export const getWorkbookList = createSelector(
  selectWorkbookState,
  (state: WorkbookState) => state.workbooks
)

export const getSelectedWorkbook = createSelector(
  selectWorkbookState,
  (state: WorkbookState) => state.selected
)
