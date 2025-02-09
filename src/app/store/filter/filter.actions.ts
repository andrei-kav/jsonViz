import {createAction, props} from '@ngrx/store';
import {SortingType} from '../../models/models';

export enum FilterAction {
  SET_SORTING = '[Filter] Set Sorting',
  SET_HIDE_IF = '[Filter] Set Hide If Less Or Equal',
}

export const setSorting = createAction(
  FilterAction.SET_SORTING,
  props<{ sorting: SortingType }>()
);

export const setHideIf = createAction(
  FilterAction.SET_HIDE_IF,
  props<{ hideIfLessOrEqual: number | null }>()
);
