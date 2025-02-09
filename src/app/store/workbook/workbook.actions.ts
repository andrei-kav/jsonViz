import {createAction, props} from '@ngrx/store';
import {Workbook, Workbooks} from '../../models/models';

export enum WorkbookAction {
  SET_WORKBOOKS = '[Workbook] Set Workbooks',
  SELECT_WORKBOOK = '[Workbook] Select Workbook',
}

export const setWorkbooks = createAction(
  WorkbookAction.SET_WORKBOOKS,
  props<{ workbooks: Workbooks }>()
);

export const selectWorkbook = createAction(
  WorkbookAction.SELECT_WORKBOOK,
  props<{ selected: Workbook }>()
);
