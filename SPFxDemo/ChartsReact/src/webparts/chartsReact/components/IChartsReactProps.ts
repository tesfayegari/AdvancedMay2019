import { SPHttpClient } from "@microsoft/sp-http";

export interface IChartsReactProps {
  description: string;
  siteName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}

export interface ChartsReactState{
  data: any;
  listName: string;
}
export interface ChartProps{
  data: any;
}

export interface IListItem{
  Title: string;
  Amount: number;
}
