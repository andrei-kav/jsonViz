export interface DataItem {
  category: string,
  value: number
}

export type WorkbookData = Array<DataItem>

export type Workbook = {
  name: string,
  data: WorkbookData
  added: Date
}

export type Workbooks = Array<Workbook>

export enum SortingType {
  DEFAULT = 'Default',
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
  REVERSE = 'Reverse'
}

