import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ChartsReactWebPartStrings';
import ChartsReact from './components/ChartsReact';
import { IChartsReactProps } from './components/IChartsReactProps';

export interface IChartsReactWebPartProps {
  description: string;
}

export default class ChartsReactWebPart extends BaseClientSideWebPart<IChartsReactWebPartProps> {

  public render(): void {
    console.log(this.context.pageContext.web.title);
    const element: React.ReactElement<IChartsReactProps > = React.createElement(
      ChartsReact,
      {
        description: this.properties.description,
        siteName: this.context.pageContext.web.title,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl
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
