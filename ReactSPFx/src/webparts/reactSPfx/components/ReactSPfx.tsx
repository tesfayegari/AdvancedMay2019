import * as React from 'react';

//import styles from './ReactSPfx.module.scss';
import { IReactSPfxProps } from './IReactSPfxProps';
import ItemForm from "./ItemForm";
import FormType, { IListItem } from './FormType';
import { SPHttpClientResponse, SPHttpClient } from '@microsoft/sp-http';

export default class ReactSPfx extends React.Component<IReactSPfxProps, {}> {
  private listItemEntityTypeName: string = undefined;
  constructor(props){
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  private createItem(data: IListItem): void {
    const {Title,Description,Photo,JobTitle,Until} = data;
    this.getListItemEntityTypeName()
      .then((listItemEntityTypeName: string): Promise<SPHttpClientResponse> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': Title,
          'Description': Description,
          'Photo': Photo,
          'Until': Until,
          'JobTitle': JobTitle
        });
        return this.props.spHttpClient.post(`${this.props.webUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': ''
            },
            body: body
          });
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        console.log('The item created is ', item);
        console.log(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);
      }, (error: any): void => {
        console.log('Error while creating the item: ' + error);
      });
  }

  private getListItemEntityTypeName(): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      if (this.listItemEntityTypeName) {
        resolve(this.listItemEntityTypeName);
        return;
      }

      this.props.spHttpClient.get(`${this.props.webUrl}/_api/web/lists/getbytitle('${this.props.listName}')?$select=ListItemEntityTypeFullName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
          resolve(this.listItemEntityTypeName);
        });
    });
  }

  private handleSave(data: IListItem){
    console.log('About to create', data);
    this.createItem(data);
  }
  
  public render(): React.ReactElement<IReactSPfxProps> {
    return (
      <div>        
        <ItemForm formType={FormType.New} handleSubmit={this.handleSave} />
      </div>
    );
  }
}
