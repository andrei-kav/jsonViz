import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {workbookReducers} from './workbook/workbook.reducers';
import {filterReducers} from './filter/filter.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  workbook: workbookReducers,
  filter: filterReducers
}
