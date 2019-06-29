import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HellowWorld1WebPart.module.scss';
import * as strings from 'HellowWorld1WebPartStrings';
import { ISPLists, ISPList } from '../ListModel';
import MockListData from '../MockListData';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

export interface IHellowWorld1WebPartProps {
  description: string;
}

export default class HellowWorld1WebPart extends BaseClientSideWebPart<IHellowWorld1WebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.hellowWorld1 }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <p class="${ styles.description }">${escape(this.context.pageContext.web.title)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
              <div id="SPLists"></div>
            </div>
          </div>
          
        </div>
        
      </div>`;
      this._renderList();
  }

  private _renderList(): void{
    
    if (this._isLocalWorkbench()) {
      this._getMockListData().then((response) => {
        this._generateHtml(response.value);
      });
    }
    else {
      this._getListData().then((response) => {
          
          this._generateHtml(response.value);
        });
    }
    
  }

  private _generateHtml(lists: ISPList[]): void{
    var html: string = '';
      lists.forEach((item: ISPList) => {
        html += `
      <ul class="${styles.description}">
        <li class="${styles.description}">
          <span class="ms-font-l">${item.Title}</span>
        </li>
      </ul>`;
      });
      const listContainer: Element = this.domElement.querySelector('#SPLists');
      listContainer.innerHTML = html;
  }

  private _isLocalWorkbench(): boolean{
    if(Environment.type == EnvironmentType.Local){
      return true;
    }
    return false;
  }

  private _getMockListData(): Promise<ISPLists> {
    return MockListData.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(): Promise<ISPLists> {
    const url = this.context.pageContext.web.absoluteUrl;
    return this.context.spHttpClient.get(url + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
