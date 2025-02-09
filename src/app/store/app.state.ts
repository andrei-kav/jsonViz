import {initialWorkbookState, WorkbookState} from './workbook/workbook.state';
import {FilterState, initialFilterState} from './filter/filter.state';

export interface AppState {
  workbook: WorkbookState,
  filter: FilterState
}

export const initialAppState: AppState = {
  workbook: initialWorkbookState,
  filter: initialFilterState
}

export const getInitialState = (): AppState => {
  return initialAppState
}
