import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { SPComponentLoader } from "@microsoft/sp-loader";

import 'jquery';
import 'popper';
require('bootstrap');

import * as strings from 'NewsSliderWebPartStrings';
import NewsSlider from './components/NewsSlider';
import { INewsSliderProps } from './components/INewsSliderProps';

export interface INewsSliderWebPartProps {
  description: string;
}

export default class NewsSliderWebPart extends BaseClientSideWebPart<INewsSliderWebPartProps> {

  public render(): void {
    const bootstrapCss = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    SPComponentLoader.loadCss(bootstrapCss);
    const element: React.ReactElement<INewsSliderProps > = React.createElement(
      NewsSlider,
      {
        description: this.properties.description
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
