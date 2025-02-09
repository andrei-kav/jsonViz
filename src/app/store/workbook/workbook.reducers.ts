import {initialWorkbookState} from './workbook.state';
import {selectWorkbook, setWorkbooks} from './workbook.actions';
import {createReducer, on} from '@ngrx/store';

export const workbookReducers = createReducer(
  initialWorkbookState,
  on(setWorkbooks, (state, { workbooks }) => ({
    ...state,
    workbooks: workbooks
  })),
  on(selectWorkbook, (state, { selected }) => ({
    ...state,
    selected: selected
  }))
)

// export const workbookReducers = (
//   state = initialWorkbookState,
//   action: WorkbookActions
// ): WorkbookState => {
//   switch (action.type) {
//     case WorkbookAction.SET_WORKBOOKS: {
//       return {
//         ...state,
//         workbooks: action.payload
//       }
//     }
//     case WorkbookAction.SELECT_WORKBOOK: {
//       return {
//         ...state,
//         selected: action.payload
//       }
//     }
//
//     default:
//       return state
//   }
// }
