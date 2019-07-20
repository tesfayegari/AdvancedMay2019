import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-property-pane";

import { SPComponentLoader } from "@microsoft/sp-loader";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

import * as strings from "NewsSliderWebPartStrings";
import NewsSlider from "./components/NewsSlider";
import { INewsSliderProps } from "./components/INewsSliderProps";

import * as $ from "jquery";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface INewsSliderWebPartProps {
  description: string;
  lists: string;// | string[]; // Stores the list ID(s)
}

export interface IList {
  Title: string;
  Description: string;
  imageUrl: string;
  ulr: string;
  ID?: number;
  LinkLabel: string;
}

export default class NewsSliderWebPart extends BaseClientSideWebPart<
  INewsSliderWebPartProps
  > {
  public render(): void {
    let bootstrapCss =
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css",
      jQueryUrl =
        "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
      bootstrapJs =
        "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js";
    SPComponentLoader.loadCss(bootstrapCss);

    SPComponentLoader.loadScript(jQueryUrl, {
      globalExportsName: "jQuery"
    })
      .catch(error => {
        console.log("jQuery loader error occurred");
      })
      .then(() => {
        SPComponentLoader.loadScript(bootstrapJs)
          .then(() => {
            (<any>jQuery(".carousel")).carousel({ interval: 2000 });
          });
      });

    this.readItems(this.properties.lists).then((response) => {
      let listItems = response.value;
      const element: React.ReactElement<INewsSliderProps> = React.createElement(
        NewsSlider,
        {
          items: listItems
        }
      );
  
      ReactDom.render(element, this.domElement);
      (<any>jQuery(".carousel")).carousel({ interval: 2000 });
    });
    


  }

  protected get disableReactivePropertyChanges() {
    return true;
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  // Read operation
  private readItems(listGuid: string) {
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${listGuid}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IList[] }> => {
        return response.json();
      });
  }
  // end of read operation

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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldListPicker('lists', {
                  label: 'Select a slider list',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
