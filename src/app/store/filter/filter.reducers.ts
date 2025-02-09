import {initialFilterState} from './filter.state';
import {setHideIf, setSorting} from './filter.actions';
import {createReducer, on} from '@ngrx/store';

export const filterReducers = createReducer(
  initialFilterState,
  on(setSorting, (state, { sorting }) => ({
    ...state,
    sorting
  })),
  on(setHideIf, (state, { hideIfLessOrEqual }) => ({
    ...state,
    hideIfLessOrEqual
  }))
)
