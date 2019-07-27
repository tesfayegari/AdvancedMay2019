enum FormType{
  Dispplay,
  Edit,
  New
}

export interface IListItem{
  Title: string;
  Photo: string;
  JobTitle: string;
  Description: string;
  Until: string;
  Id?: number;
}

export default FormType;