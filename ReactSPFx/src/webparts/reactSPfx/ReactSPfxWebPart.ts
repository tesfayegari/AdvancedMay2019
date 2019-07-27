import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { SPComponentLoader } from "@microsoft/sp-loader";


import * as strings from 'ReactSPfxWebPartStrings';
import ReactSPfx from './components/ReactSPfx';
import { IReactSPfxProps } from './components/IReactSPfxProps';

export interface IReactSPfxWebPartProps {
  description: string;
}

export default class ReactSPfxWebPart extends BaseClientSideWebPart<IReactSPfxWebPartProps> {

  public render(): void {
    let bootstrapCss =
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css";
    SPComponentLoader.loadCss(bootstrapCss);
   
    const element: React.ReactElement<IReactSPfxProps > = React.createElement(
      ReactSPfx,
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        listName: 'EmployeeSpotlight',
        webUrl: this.context.pageContext.web.absoluteUrl  
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
