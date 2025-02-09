import {SortingType} from '../../models/models';

export interface FilterState {
  sorting: SortingType,
  hideIfLessOrEqual: number | null
}

export const initialFilterState: FilterState = {
  sorting: SortingType.DEFAULT,
  hideIfLessOrEqual: null
}
