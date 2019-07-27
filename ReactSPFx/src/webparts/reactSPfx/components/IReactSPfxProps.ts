import { SPHttpClient } from "@microsoft/sp-http";

export interface IReactSPfxProps {
  description: string;
  spHttpClient: SPHttpClient;
  listName: string;
  webUrl: string;
}
