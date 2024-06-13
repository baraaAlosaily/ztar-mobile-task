export interface ICategory {
  name: string;
  description: string;
  books: number;
  id?: string;
}

export interface ITableSetting {
  name: string;
  key: string;
  type: string;
}

export interface ICategoryReq {
  size: number;
  page: number;
  search?: string;
  field?: string;
}

export interface IFakeCategory{
  id: number;
  name: string;
  value: string;
}
