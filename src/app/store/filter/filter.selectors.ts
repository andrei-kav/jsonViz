import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FilterState} from './filter.state';

const selectFilterState = createFeatureSelector<FilterState>('filter')

export const getSorting = createSelector(
  selectFilterState,
  (state: FilterState) => state.sorting
)

export const getHideIf = createSelector(
  selectFilterState,
  (state: FilterState) => state.hideIfLessOrEqual
)
