import {Workbook} from '../../models/models';

export interface WorkbookState {
  workbooks: Array<Workbook>,
  selected: Workbook | null
}

export const initialWorkbookState: WorkbookState = {
  workbooks: [],
  selected: null
}
